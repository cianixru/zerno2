import { promises as fs } from 'fs';

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { ConfigurationReaderMockService, ConfigurationReaderModule, ConfigurationReaderService } from '@zern/nest';

import { MonolithModule } from './monolith.module';

const monolith = await NestFactory.create(
    MonolithModule.forFeature([
        ConfigurationReaderModule.forFeature({
            provide: ConfigurationReaderService,
            useClass: ConfigurationReaderMockService,
        }),
    ]),
);

const openApiBuilder = new DocumentBuilder();

const openApiConfiguration = openApiBuilder
    .addBearerAuth()
    .build();

const openApi = SwaggerModule.createDocument(monolith, openApiConfiguration);

await fs.writeFile(
    'open-api.json',
    JSON.stringify(openApi, null, 4),
);
