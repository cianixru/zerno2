import { DynamicModule, Module, Type } from '@nestjs/common';

import { ConfigurationReaderService } from '../configuration-reader';

@Module({})
class ConfigurationModule {
    public static forFeature <T> (ConfigurationService: Type <T>): DynamicModule {
        return {
            global: true,
            module: ConfigurationModule,
            providers: [
                {
                    provide: ConfigurationService,
                    useFactory (configurationReaderService: ConfigurationReaderService) {
                        return new ConfigurationService(configurationReaderService);
                    },
                    inject: [
                        ConfigurationReaderService,
                    ],
                },
            ],
            exports: [
                ConfigurationService,
            ],
        };
    }
}

export { ConfigurationModule };
