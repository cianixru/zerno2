import { randomInt } from 'crypto';

import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import {
    ConfirmEdmoDataPathParams,
    CreateEdmoDataBody,
    CreateEdmoDataPathParams,
    GetEdmoDataPathParams,
    GetEdmoDataResponse, UpdateEdmoDataBody,
    UpdateEdmoDataPathParams,
} from './requests';

@Controller()
@ApiTags('CompanyMock')
@ApiBearerAuth()
class CompanyEdmoMockController {
    @Get('mock/company/:companyId/edmo')
    @ApiOkResponse({
        type: GetEdmoDataResponse,
        description: 'Данные об операторе ЭДО отправлены',
    })
    public async getEdmoData (
        @Param()
        pathParams: GetEdmoDataPathParams,
    ): Promise <GetEdmoDataResponse> {
        return {
            edmo: ((pathParams.companyId && randomInt(2)) ? null : {
                edmoName: 'ООО Бумажно-цифровые решения',
                edmId: '80282398',
                dataIsChecking: (randomInt(0, 2) > 0),
            }),
        };
    }

    @Post('mock/company/:companyId/edmo')
    @ApiCreatedResponse({
        description: 'Данные об операторе ЭДО созданы',
    })
    public async createEdmoData (
        @Param()
        pathParams: CreateEdmoDataPathParams,

        @Body()
        body: CreateEdmoDataBody,
    ): Promise <void> {
        if (pathParams || body) {
            return;
        }
    }

    @Patch('mock/company/:companyId/edmo')
    @ApiOkResponse({
        description: 'Данные об операторе ЭДО обновлены',
    })
    public async updateEdmoData (
        @Param()
        pathParams: UpdateEdmoDataPathParams,

        @Body()
        body: UpdateEdmoDataBody,
    ): Promise <void> {
        if (pathParams || body) {
            return;
        }
    }

    @Post('mock/company/:companyId/edmo/confirmation')
    @ApiCreatedResponse({
        description: 'Данные об операторе ЭДО подтверждены',
    })
    public async confirmEdmoData (
        @Param()
        pathParams: ConfirmEdmoDataPathParams,
    ): Promise <void> {
        if (pathParams) {
            return;
        }
    }
}

export { CompanyEdmoMockController };
