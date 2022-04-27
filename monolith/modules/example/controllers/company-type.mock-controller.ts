import { randomInt } from 'crypto';

import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import {
    CompanyAccountType,
    ConfirmCompanyAccountTypeDataPathParams,
    GetCompanyAccountTypeDataPathParams,
    GetCompanyAccountTypeDataResponse,
    UpdateCompanyAccountTypeDataBody,
    UpdateCompanyAccountTypeDataPathParams,
} from './requests';

@Controller()
@ApiTags('CompanyMock')
@ApiBearerAuth()
class CompanyTypeMockController {
    @Get('mock/company/:companyId/account-type')
    @ApiOkResponse({
        type: GetCompanyAccountTypeDataResponse,
        description: 'Данные о типе аккаунта компании отправлены',
    })
    public async getCompanyAccountType (
        @Param()
        pathParams: GetCompanyAccountTypeDataPathParams,
    ): Promise <GetCompanyAccountTypeDataResponse> {
        return {
            accountType: ((pathParams.companyId && randomInt(2)) ? null : {
                type: [CompanyAccountType.BUYER, CompanyAccountType.FARMER, CompanyAccountType.TRADER][randomInt(3)],
                dataIsChecking: (randomInt(0, 2) > 0),
            }),
        };
    }

    @Patch('mock/company/:companyId/account-type')
    @ApiOkResponse({
        description: 'Данные о типе аккаунта компании изменены',
    })
    public async updateCompanyAccountType (
        @Param()
        pathParams: UpdateCompanyAccountTypeDataPathParams,

        @Body()
        body: UpdateCompanyAccountTypeDataBody,
    ): Promise <void> {
        if (pathParams || body) {
            return;
        }
    }

    @Post('mock/company/:companyId/account-type/confirmation')
    @ApiCreatedResponse({
        description: 'Данные о типе аккаунта компании подтверждены',
    })
    public async confirmCompanyAccountType (
        @Param()
        pathParams: ConfirmCompanyAccountTypeDataPathParams,
    ): Promise <void> {
        if (pathParams) {
            return;
        }
    }
}

export { CompanyTypeMockController };
