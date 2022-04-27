import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MonolithConfigurationService } from '../../common';

import {
    AccountsPostgresRepository,
    AccountsRepository,
    RefreshTokensPostgresRepository,
    RefreshTokensRepository,
    SecretCodesInMemoryRepository,
    SecretCodesRepository,
    UsersPostgresRepository,
    UsersRepository,
} from '../../store';

import { AccountPostgresSchema, RefreshTokenPostgresSchema, UserPostgresSchema } from '../../store/schemas';

import { AuthenticationController } from './controllers';
import { AuthenticationService, AuthenticationSmsService } from './services';

@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory (monolithConfigurationService: MonolithConfigurationService) {
                return {
                    signOptions: {
                        algorithm: 'RS256',
                    },
                    privateKey: monolithConfigurationService.cryptoKeys.jwtPrivateKey,
                    publicKey: monolithConfigurationService.cryptoKeys.jwtPublicKey,
                };
            },
            inject: [
                MonolithConfigurationService,
            ],
        }),

        TypeOrmModule.forFeature([
            AccountPostgresSchema,
            RefreshTokenPostgresSchema,
            UserPostgresSchema,
        ]),
    ],
    controllers: [
        AuthenticationController,
    ],
    providers: [
        AuthenticationService,
        AuthenticationSmsService,

        {
            provide: AccountsRepository,
            useClass: AccountsPostgresRepository,
        },

        {
            provide: RefreshTokensRepository,
            useClass: RefreshTokensPostgresRepository,
        },

        {
            provide: SecretCodesRepository,
            useClass: SecretCodesInMemoryRepository,
        },

        {
            provide: UsersRepository,
            useClass: UsersPostgresRepository,
        },
    ],
})
export class AuthenticationModule {}
