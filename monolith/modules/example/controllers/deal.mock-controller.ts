import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { FormDataRequest } from 'nestjs-form-data';

import {
    CreateDealBody,
    CreateDealPathParams,
    CreateDealResponse,
    CreateDealSpecificationBody,
    CreateDealSpecificationPathParams,
    GetDealDocumentsPathParams,
    GetDealDocumentsResponse,
    GetDealSpecificationPathParams,
    GetDealSpecificationResponse,
    GetDealsQueryParams,
    GetDealsResponse,
    UpdateDealDocumentStatusBody,
    UpdateDealDocumentStatusPathParams,
    UpdateDealDocumentTypeBody,
    UpdateDealDocumentTypePathParams,
    UpdateDealStatusBody,
    UpdateDealStatusPathParams,
    UploadDealDocumentBody,
    UploadDealDocumentPathParams,
    UploadDealDocumentResponse,
} from './requests';

@Controller()
@ApiTags('DealMock')
@ApiBearerAuth()
class DealMockController {
    @Get('mock/deals')
    @ApiOkResponse({
        type: GetDealsResponse,
        description: 'Список сделок успешно отправлен',
    })
    public async getDeals (
        @Query()
        queryParams: GetDealsQueryParams,
    ): Promise <GetDealsResponse> {
        return {
            deals: [
                {
                    id: (queryParams.companyIds[0] - 1),
                    offerId: (queryParams.companyIds[0] - 2),
                    companyId: (queryParams.companyIds[0] - 3),
                    status: 'created',
                },
            ],
        };
    }

    @Post('mock/company/:companyId/deal')
    @ApiCreatedResponse({
        type: CreateDealResponse,
        description: 'Сделка успешно создана',
    })
    public async createDeal (
        @Param()
        pathParams: CreateDealPathParams,

        @Body()
        body: CreateDealBody,
    ): Promise <CreateDealResponse> {
        return {
            dealId: (pathParams.companyId + (body ? 1 : 0)),
        };
    }

    @Patch('mock/deal/:dealId/status')
    @ApiOkResponse({
        description: 'Статус сделки успешно изменён',
    })
    public async updateDealStatus (
        @Param()
        pathParams: UpdateDealStatusPathParams,

        @Body()
        body: UpdateDealStatusBody,
    ): Promise <void> {
        if (pathParams || body) {
            return;
        }
    }

    @Post('mock/deal/:dealId/specification')
    @ApiCreatedResponse({
        description: 'Спецификация сделки успешно создана',
    })
    public async createDealSpecification (
        @Param()
        pathParams: CreateDealSpecificationPathParams,

        @Body()
        body: CreateDealSpecificationBody,
    ): Promise <void> {
        if (pathParams || body) {
            return;
        }
    }

    @Get('mock/deal/:dealId/specification')
    @ApiOkResponse({
        type: GetDealSpecificationResponse,
        description: 'Спецификация сделки успешно отправлена',
    })
    public async getDealSpecification (
        @Param()
        pathParams: GetDealSpecificationPathParams,
    ): Promise <GetDealSpecificationResponse> {
        return {
            productType: 'wheat_3',
            count: 2000,
            price: 13600,
            address: 'Владимирская область, город Москва, проезд Ленина, 02',
            status: 'created',
            parameters: {
                protein: pathParams.dealId,
            },
        };
    }

    @Get('mock/deal/:dealId/documents')
    @ApiOkResponse({
        type: GetDealDocumentsResponse,
        description: 'Документы по сделке успешно отправлены',
    })
    public async getDealDocuments (
        @Param()
        pathParams: GetDealDocumentsPathParams,
    ): Promise <GetDealDocumentsResponse> {
        return {
            documents: [
                {
                    id: (pathParams.dealId - 1),
                    type: 'unknown',
                    status: 'created',
                    documentUrl: 'https://example.com',
                },
            ],
        };
    }

    @Post('mock/deal/:dealId/document')
    @FormDataRequest()
    @ApiConsumes('multipart/form-data')
    @ApiCreatedResponse({
        type: UploadDealDocumentResponse,
        description: 'Документ по сделке успешно загружен',
    })
    public async uploadDealDocument (
        @Param()
        pathParams: UploadDealDocumentPathParams,

        @Body()
        body: UploadDealDocumentBody,
    ): Promise <UploadDealDocumentResponse> {
        return {
            documentId: (pathParams.dealId + (body ? 1 : 0)),
        };
    }

    @Patch('mock/deal/:dealId/document/:documentId/type')
    @ApiOkResponse({
        description: 'Тип документа по сделке успешно обновлён',
    })
    public async updateDealDocumentType (
        @Param()
        pathParams: UpdateDealDocumentTypePathParams,

        @Body()
        body: UpdateDealDocumentTypeBody,
    ): Promise <void> {
        if (pathParams || body) {
            return;
        }
    }

    @Patch('mock/deal/:dealId/document/:documentId/status')
    @ApiOkResponse({
        description: 'Статус документа по сделке успешно обновлён',
    })
    public async updateDealDocumentStatus (
        @Param()
            pathParams: UpdateDealDocumentStatusPathParams,

        @Body()
            body: UpdateDealDocumentStatusBody,
    ): Promise <void> {
        if (pathParams || body) {
            return;
        }
    }
}

export { DealMockController };
