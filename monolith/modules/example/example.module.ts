import { Module } from '@nestjs/common';

import { NestjsFormDataModule } from 'nestjs-form-data';

import {
    CompanyBankAccountMockController,
    CompanyEdmoMockController,
    CompanyMockController,
    CompanyTypeMockController,
    DealMockController,
    ExampleController,
    OfferMockController,
    UserMockController,
    WarehouseMockController,
} from './controllers';

import { ExampleService } from './services';

@Module({
    imports: [
        NestjsFormDataModule,
    ],
    controllers: [
        CompanyMockController,
        CompanyBankAccountMockController,
        CompanyEdmoMockController,
        CompanyTypeMockController,
        DealMockController,
        ExampleController,
        OfferMockController,
        UserMockController,
        WarehouseMockController,
    ],
    providers: [
        {
            provide: ExampleService,
            useClass: ExampleService,
        },
    ],
})
export class ExampleModule {}
