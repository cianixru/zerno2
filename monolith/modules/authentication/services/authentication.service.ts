import { randomInt } from 'crypto';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { v4 as generateUuidV4 } from 'uuid';

import { Nullable } from '@zern/types';

import { MonolithConfigurationService } from '../../../common';
import { AccountEntity, AccountsRepository, RefreshTokensRepository, SecretCodesRepository } from '../../../store';

import {
    AccountNotFoundException,
    RefreshTokenExpiredException,
    RefreshTokenInvalidException,
    RefreshTokenNotConfirmedException,
    SecretCodeInvalidException,
} from '../exceptions';

import { AuthenticationSmsService } from './authentication.sms-service';

type SessionTokens = {
    accessToken: string;
    refreshToken: string;
};

type JwtPayload = {
    sub: number;
    userId: Nullable <number>;
    companyId: Nullable <number>;
};

type FilteredObject <T extends Record <string, any>> = {
    [K in keyof T]: T[K] extends null ? Exclude <T[K], null> | undefined : T[K];
};

@Injectable()
class AuthenticationService {
    public constructor (
        private readonly monolithConfigurationService: MonolithConfigurationService,
        private readonly authenticationSmsService: AuthenticationSmsService,
        private readonly accountsRepository: AccountsRepository,
        private readonly refreshTokensRepository: RefreshTokensRepository,
        private readonly secretCodesRepository: SecretCodesRepository,
        private readonly jwtService: JwtService,
    ) {
    }

    public async createSecretCode (phoneNumber: string): Promise <void> {
        const secretCode = this.generateSecretCode();

        const formattedSecretCode = AuthenticationService.formatSecretCode(secretCode);

        await this.authenticationSmsService.send(phoneNumber, `Код подтверждения: ${formattedSecretCode}`);

        const { expirationTimeInSeconds } = this.monolithConfigurationService.secretCode;

        const entity = await this.secretCodesRepository.create({
            phoneNumber,
            secretCode,
            expiredAt: new Date(Date.now() + (expirationTimeInSeconds * 1000)),
        });

        await this.secretCodesRepository.save(entity);
    }

    public async createSession (phoneNumber: string, secretCode: string): Promise <SessionTokens> {
        await this.checkSecretCode(phoneNumber, secretCode);

        const accountEntity = await this.accountsRepository.getBySignInIdOrCreate(phoneNumber);

        const accountModel = AccountEntity.serialize(accountEntity);

        return this.generateTokens({
            sub: accountModel.id,
            userId: accountModel.userId,
            companyId: accountModel.companyId,
        });
    }

    public async updateSession (user: Record <string, unknown>, refreshToken: string): Promise <SessionTokens> {
        const decodedRefreshToken = await this.jwtService.verifyAsync(refreshToken);

        if (user.jti !== decodedRefreshToken.jti) {
            throw new RefreshTokenInvalidException();
        }

        const isRefreshTokenExpired = this.isRefreshTokenExpired(decodedRefreshToken.iat);

        if (isRefreshTokenExpired) {
            throw new RefreshTokenExpiredException();
        }

        const refreshTokenEntity = await this.refreshTokensRepository.getById(decodedRefreshToken.jti);

        if (refreshTokenEntity === null) {
            throw new RefreshTokenNotConfirmedException();
        }

        const accountEntity = await this.accountsRepository.getById(user.sub as number);

        if (accountEntity === null) {
            throw new AccountNotFoundException(user.sub as number);
        }

        const accountModel = AccountEntity.serialize(accountEntity);

        const tokens = await this.generateTokens({
            sub: accountModel.id,
            userId: accountModel.userId,
            companyId: accountModel.companyId,
        });

        await this.refreshTokensRepository.delete(refreshTokenEntity);

        return tokens;
    }

    public async deleteSession (user: Record <string, unknown>, refreshToken: string): Promise <void> {
        const decodedRefreshToken = await this.jwtService.verifyAsync(refreshToken);

        if (user.jti !== decodedRefreshToken.jti) {
            throw new RefreshTokenInvalidException();
        }

        const isRefreshTokenExpired = this.isRefreshTokenExpired(decodedRefreshToken.iat);

        if (isRefreshTokenExpired) {
            throw new RefreshTokenExpiredException();
        }

        const refreshTokenEntity = await this.refreshTokensRepository.getById(decodedRefreshToken.jti);

        if (refreshTokenEntity === null) {
            throw new RefreshTokenNotConfirmedException();
        }

        await this.refreshTokensRepository.delete(refreshTokenEntity);
    }

    public async deleteSessions (
        user: Record <string, unknown>,
        refreshToken: string,
        retainCurrentSession: boolean
    ): Promise <void> {
        const decodedRefreshToken = await this.jwtService.verifyAsync(refreshToken);

        if (user.jti !== decodedRefreshToken.jti) {
            throw new RefreshTokenInvalidException();
        }

        const isRefreshTokenExpired = this.isRefreshTokenExpired(decodedRefreshToken.iat);

        if (isRefreshTokenExpired) {
            throw new RefreshTokenExpiredException();
        }

        const refreshTokenEntities = await this.refreshTokensRepository.findByAccountId(user.sub as number);

        const currentSessionRefreshTokenEntityIndex = refreshTokenEntities.findIndex(
            (refreshTokenEntity) => (refreshTokenEntity.id === decodedRefreshToken.jti)
        );

        if (currentSessionRefreshTokenEntityIndex === -1) {
            throw new RefreshTokenNotConfirmedException();
        }

        if (retainCurrentSession) {
            refreshTokenEntities.splice(currentSessionRefreshTokenEntityIndex, 1);
        }

        await this.refreshTokensRepository.deleteAll(refreshTokenEntities);
    }

    private async generateTokens (payload: JwtPayload): Promise <SessionTokens> {
        const filteredPayload = AuthenticationService.filterPayload(payload);

        const iat = Math.floor(Date.now() / 1000);
        const jti = generateUuidV4();

        const accessToken = await this.jwtService.signAsync({
            ...filteredPayload,
            iat,
            jti,
        });

        const refreshToken = await this.jwtService.signAsync({
            iat,
            jti,
        });

        await this.refreshTokensRepository.createAndSave({
            id: jti,
            accountId: filteredPayload.sub,
            createdAt: iat,
        });

        return { accessToken, refreshToken };
    }

    private async checkSecretCode (phoneNumber: string, secretCode: string): Promise <void> {
        const secretCodeEntities = await this.secretCodesRepository.find(phoneNumber);

        const isSecretCodeValid = secretCodeEntities.some(secretCodeEntity => {
            return (!secretCodeEntity.isExpired() && secretCodeEntity.isEqual(secretCode));
        });

        if (!isSecretCodeValid) {
            throw new SecretCodeInvalidException();
        }

        await this.secretCodesRepository.deleteAll(phoneNumber);
    }

    private isRefreshTokenExpired (createdTimeInSeconds: Nullable <number> = null): boolean {
        if (createdTimeInSeconds === null) {
            return true;
        }

        const { refreshTokenTimeToLifeInSeconds } = this.monolithConfigurationService.sessionTokens;
        const expirationTimeInSeconds = (createdTimeInSeconds + refreshTokenTimeToLifeInSeconds);
        const expirationTime = (expirationTimeInSeconds * 1000);
        const currentTime = Date.now();

        return (expirationTime < currentTime);
    }

    private generateSecretCode (): string {
        const { length } = this.monolithConfigurationService.secretCode;

        const max = (10 ** length);
        const x = randomInt(0, max);

        const rawSecretCode = x.toString(10);

        return rawSecretCode.padStart(length, '0');
    }

    private static filterPayload <T extends Record <string, any>> (payload: T): FilteredObject <T> {
        const entries = Object.entries(payload);
        const filteredEntries = entries.filter(([_key, value]) => ((value !== undefined) && (value !== null)));

        const filteredPayload = Object.fromEntries(filteredEntries);

        return (filteredPayload as FilteredObject <T>);
    }

    private static formatSecretCode (secretCode: string): string {
        // TODO: Create universal formatter
        if (secretCode.length === 6) {
            const firstPart = secretCode.slice(0, 3);
            const secondPart = secretCode.slice(3, 6);

            return `${firstPart}-${secondPart}`;
        }

        return secretCode;
    }
}

export { AuthenticationService };
