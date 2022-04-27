import { randomInt } from 'crypto';

import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import {
    ConfirmCompanyDataPathParams,
    CreateCompanyBody,
    CreateCompanyResponse,
    GetCompaniesDataQueryParams,
    GetCompaniesDataResponse,
    GetCompanyDataTipsQueryParams,
    GetCompanyDataTipsResponse,
    UpdateCompanyDataBody,
    UpdateCompanyDataPathParams,
} from './requests';

@Controller()
@ApiTags('CompanyMock')
@ApiBearerAuth()
class CompanyMockController {
    @Get('mock/company/data-tips')
    @ApiOkResponse({
        type: GetCompanyDataTipsResponse,
        description: 'Варианты компаний успешно отправлены',
    })
    public async getCompanyDataTips (
        @Query()
        queryParams: GetCompanyDataTipsQueryParams,
    ): Promise <GetCompanyDataTipsResponse> {
        if (queryParams.query.length < 3) {
            return {
                companies: [],
            };
        }

        return {
            companies: [
                {
                    name: 'ООО ЗерноПолюшко',
                    inn: '1234567890',
                    kpp: '123456789',
                    codeOkved: '12.34.56',
                    director: 'Данила Ефратович Полюшко',
                    legalAddress: 'Зерновск, площадь Элеваторная, дом 4',
                },
                {
                    name: 'ООО РапсИндустрия',
                    inn: '0123456789',
                    kpp: '987654321',
                    codeOkved: '98.76',
                    director: 'Сурен Олегович Фрах',
                    legalAddress: 'Совхоз Заря-Пшеничная, строение 3',
                },
            ],
        };
    }

    @Post('mock/company')
    @ApiCreatedResponse({
        type: CreateCompanyResponse,
        description: 'Компания успешно создана',
    })
    public async createCompany (
        @Body()
        body: CreateCompanyBody,
    ): Promise <CreateCompanyResponse> {
        return {
            companyId: (body ? randomInt(100) : 0),
        };
    }

    @Get('mock/companies')
    @ApiOkResponse({
        type: GetCompaniesDataResponse,
        description: 'Список компаний успешно отправлен',
    })
    public async getCompaniesData (
        @Query()
        queryParams: GetCompaniesDataQueryParams,
    ): Promise <GetCompaniesDataResponse> {
        return {
            companies: queryParams.companyIds.map(companyId => ({
                id: companyId,
                name: 'OOO ',
                inn: '0192837465',
                kpp: '192837465',
                codeOkved: '12.34',
                director: 'Олег Христофорович Важнов',
                legalAddress: 'Новосибирск, проспект Пахарей, дом 7',
                actualAddress: 'Омск, улица Сеятелей, дом 8',
                usingNds: (randomInt(0, 2) > 0),
                aicCharterMember: (randomInt(0, 2) > 0),
                dataIsChecking: (randomInt(0, 2) > 0),
            })),
        };
    }

    @Patch('mock/company/:companyId')
    @ApiOkResponse({
        description: 'Данные о компании успешно обновлены',
    })
    public async updateCompanyData (
        @Param()
        pathParams: UpdateCompanyDataPathParams,

        @Body()
        body: UpdateCompanyDataBody,
    ): Promise <void> {
        if (pathParams || body) {
            return;
        }
    }

    @Post('mock/company/:companyId/confirmation')
    @ApiCreatedResponse({
        description: 'Данные о компании успешно подтверждены',
    })
    public async confirmCompanyData (
        @Param()
        pathParams: ConfirmCompanyDataPathParams,
    ): Promise <void> {
        if (pathParams) {
            return;
        }
    }
}

export { CompanyMockController };
