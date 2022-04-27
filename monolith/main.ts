import { NestFactory } from '@nestjs/core';

import { ConfigurationReader } from '@zern/common';

import { MonolithModule } from './monolith.module';

async function bootstrap (): Promise <void> {
    const allowedOrigins = ConfigurationReader.readStringArray('ALLOWED_ORIGINS', ',');

    const monolith = await NestFactory.create(
        MonolithModule.forRoot(),
    );

    monolith.enableCors({
        origin: allowedOrigins,
    });

    await monolith.listen(3000);
}

await bootstrap();
