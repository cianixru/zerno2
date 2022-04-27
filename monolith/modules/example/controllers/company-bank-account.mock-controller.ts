import { randomInt } from 'crypto';

import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import {
    CreateBankAccountBody,
    CreateBankAccountPathParams,
    CreateBankAccountResponse, DeleteBankAccountPathParams,
    GetBankAccountsPathParams,
    GetBankAccountsResponse, UpdateBankAccountBody, UpdateBankAccountPathParams,
} from './requests';


@Controller()
@ApiTags('CompanyMock')
@ApiBearerAuth()
class CompanyBankAccountMockController {
    @Get('mock/company/:companyId/bank-accounts')
    @ApiOkResponse({
        type: GetBankAccountsResponse,
        description: 'Список реквизитов успешно отправлен',
    })
    public async getBankAccounts (
        @Param()
        pathParams: GetBankAccountsPathParams,
    ): Promise <GetBankAccountsResponse> {
        return {
            bankAccounts: [
                {
                    id: (pathParams.companyId - 1),
                    bankName: 'Жёлтый банк',
                    settlementAccount: '40603810450000000005',
                    correspondentAccount: '30101810300000000743',
                    bic: '041806647',
                },
                {
                    id: (pathParams.companyId + 1),
                    bankName: 'Красный банк',
                    settlementAccount: '40702840000000001221',
                    correspondentAccount: '30101810145250000411',
                    bic: '045773843',
                },
            ],
        };
    }

    @Post('mock/company/:companyId/bank-account')
    @ApiCreatedResponse({
        type: CreateBankAccountResponse,
        description: 'Реквизиты успешно созданы',
    })
    public async createBankAccount (
        @Param()
        pathParams: CreateBankAccountPathParams,

        @Body()
        body: CreateBankAccountBody,
    ): Promise <CreateBankAccountResponse> {
        return {
            bankAccountId: ((pathParams || body) ? randomInt(0, 100) : 0),
        };
    }

    @Patch('mock/bank-account/:bankAccountId')
    @ApiOkResponse({
        description: 'Реквизиты успешно изменены',
    })
    public async updateBankAccount (
        @Param()
        pathParams: UpdateBankAccountPathParams,

        @Body()
        body: UpdateBankAccountBody,
    ): Promise <void> {
        if (pathParams || body) {
            return;
        }
    }

    @Delete('mock/bank-account/:bankAccountId')
    @ApiOkResponse({
        description: 'Реквизиты успешно удалены',
    })
    public async deleteBankAccount (
        @Param()
        pathParams: DeleteBankAccountPathParams,
    ): Promise <void> {
        if (pathParams) {
            return;
        }
    }
}

export { CompanyBankAccountMockController };
