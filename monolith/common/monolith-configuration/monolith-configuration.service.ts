import { Injectable } from '@nestjs/common';

import { ConfigurationReaderService } from '@zern/nest';

type CryptoKeys = {
    jwtPrivateKey: string;
    jwtPublicKey: string;
};

type PostgresConfiguration = {
    host: string;
    port: number,
    username: string,
    password: string,
    database: string,
};

type SecretCodeConfiguration = {
    expirationTimeInSeconds: number;
    length: number;
};

type SessionTokensConfiguration = {
    accessTokenTimeToLifeInSeconds: number;
    refreshTokenTimeToLifeInSeconds: number;
};

@Injectable()
class MonolithConfigurationService {
    public readonly cryptoKeys: CryptoKeys;

    public readonly postgres: PostgresConfiguration;

    public readonly secretCode: SecretCodeConfiguration;

    public readonly sessionTokens: SessionTokensConfiguration;

    public readonly smsRuApiId: string;

    public constructor (
        configurationReaderService: ConfigurationReaderService,
    ) {
        const configuration: MonolithConfigurationService = {
            cryptoKeys: {
                jwtPrivateKey: configurationReaderService.readFile('PRIVATE_KEY_PATH'),
                jwtPublicKey: configurationReaderService.readFile('PUBLIC_KEY_PATH'),
            },

            postgres: {
                host: configurationReaderService.getString('POSTGRES_HOST'),
                port: configurationReaderService.getNumber('POSTGRES_PORT'),
                username: configurationReaderService.getString('POSTGRES_USER'),
                password: configurationReaderService.readFile('POSTGRES_PASSWORD_PATH'),
                database: configurationReaderService.getString('POSTGRES_DATABASE'),
            },

            sessionTokens: {
                accessTokenTimeToLifeInSeconds: configurationReaderService.getNumber('ACCESS_TOKEN_TTL_IN_SECONDS'),
                refreshTokenTimeToLifeInSeconds: configurationReaderService.getNumber('REFRESH_TOKEN_TTL_IN_SECONDS'),
            },

            secretCode: {
                // eslint-disable-next-line max-len
                expirationTimeInSeconds: configurationReaderService.getNumber('SECRET_CODE_EXPIRATION_TIME_IN_SECONDS'),
                length: configurationReaderService.getNumber('SECRET_CODE_LENGTH'),
            },

            smsRuApiId: configurationReaderService.readFile('SMS_RU_API_ID_PATH'),
        };

        Object.assign(this, configuration);
    }
}

export { MonolithConfigurationService };
