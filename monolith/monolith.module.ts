import { DynamicModule, Module, ModuleMetadata, ValidationPipe } from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
    ConfigurationModule,
    ConfigurationReaderModule,
    JwtAuthorizationGuard,
    JwtAuthorizationStrategy,
} from '@zern/nest';

import { MonolithConfigurationService } from './common';
import { AuthenticationModule, ExampleModule, UserModule } from './modules';

const monolithModuleMetadata: Pick <Required <ModuleMetadata>, 'imports' | 'providers'> = {
    imports: [
        ConfigurationModule.forFeature(MonolithConfigurationService),

        TypeOrmModule.forRootAsync({
            useFactory (monolithConfigurationService: MonolithConfigurationService) {
                const { host, port, username, password, database } = monolithConfigurationService.postgres;

                return {
                    type: 'postgres',
                    host,
                    port,
                    username,
                    password,
                    database,
                    entities: ['**/store/schemas/postgres/*.postgres-schema.js'],
                    migrations: ['**/databases/postgres/migrations/*.postgres-migration.js'],
                    migrationsRun: true,
                };
            },
            inject: [
                MonolithConfigurationService,
            ],
        }),

        AuthenticationModule,
        ExampleModule,
        UserModule,

        PassportModule,
    ],
    providers: [
        {
            provide: APP_PIPE,
            useValue: new ValidationPipe({
                transform: true,
                skipUndefinedProperties: false,
                whitelist: true,
                forbidNonWhitelisted: true,
            }),
        },
        {
            provide: APP_GUARD,
            useClass: JwtAuthorizationGuard,
        },
        {
            provide: JwtAuthorizationStrategy,
            useFactory (monolithConfigurationService: MonolithConfigurationService): JwtAuthorizationStrategy {
                return new JwtAuthorizationStrategy (
                    monolithConfigurationService.sessionTokens.accessTokenTimeToLifeInSeconds,
                    monolithConfigurationService.cryptoKeys.jwtPublicKey,
                );
            },
            inject: [
                MonolithConfigurationService,
            ],
        },
    ],
};

@Module({})
class MonolithModule {
    public static forFeature (imports: Required <ModuleMetadata> ['imports'] = []): DynamicModule {
        return {
            module: MonolithModule,
            imports: [
                ...imports,

                ...monolithModuleMetadata.imports,
            ],
            providers: [
                ...monolithModuleMetadata.providers,
            ],
        };
    }

    public static forRoot (): DynamicModule {
        return MonolithModule.forFeature([
            ConfigurationReaderModule.forRoot(),
        ]);
    }
}

export { MonolithModule };
