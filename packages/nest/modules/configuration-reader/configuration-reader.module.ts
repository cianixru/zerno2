import { DynamicModule, Module, Provider } from '@nestjs/common';

import { ConfigurationReaderService } from './configuration-reader.service';

@Module({})
class ConfigurationReaderModule {
    public static forFeature (
        configurationReaderServiceProvider: Provider <ConfigurationReaderService>,
    ): DynamicModule {
        return {
            global: true,
            module: ConfigurationReaderModule,
            providers: [
                configurationReaderServiceProvider,
            ],
            exports: [
                ConfigurationReaderService,
            ],
        };
    }

    public static forRoot (): DynamicModule {
        return ConfigurationReaderModule.forFeature(ConfigurationReaderService);
    }
}

export { ConfigurationReaderModule };
