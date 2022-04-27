import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import {
    CreateOfferBody,
    CreateOfferPathParams,
    CreateOfferResponse,
    GetOffersQueryParams,
    GetOffersResponse, UpdateOfferStatusBody, UpdateOfferStatusPathParams,
} from './requests';

@Controller()
@ApiTags('OfferMock')
@ApiBearerAuth()
class OfferMockController {
    @Get('mock/offers')
    @ApiOkResponse({
        type: GetOffersResponse,
        description: 'Список предложений успешно отправлен',
    })
    public async getOffers (
        @Query()
        queryParams: GetOffersQueryParams,
    ): Promise <GetOffersResponse> {
        return {
            offers: [
                {
                    id: (queryParams.companyIds[0] - 3),
                    companyId: (queryParams.companyIds[0] - 2),
                    productType: 'wheat_3',
                    offerType: 'buying',
                    status: 'created',
                    count: 2000,
                    price: 13600,
                    address: 'Владимирская область, город Москва, проезд Ленина, 02',
                    distance: 567,
                    usingNds: true,
                    parameters: {
                        protein: 12,
                    },
                },
            ],
        };
    }

    @Post('mock/company/:companyId/offer')
    @ApiCreatedResponse({
        type: CreateOfferResponse,
        description: 'Предложение успешно создано',
    })
    public async createOffer (
        @Param()
        pathParams: CreateOfferPathParams,

        @Body()
        body: CreateOfferBody,
    ): Promise <CreateOfferResponse> {
        return {
            offerId: (pathParams.companyId + (body ? 1 : 0)),
        };
    }

    @Patch('mock/company/:companyId/offer/:offerId/status')
    @ApiCreatedResponse({
        description: 'Статус предложения успешно изменён',
    })
    public async updateOfferStatus (
        @Param()
        pathParams: UpdateOfferStatusPathParams,

        @Body()
        body: UpdateOfferStatusBody,
    ): Promise <void> {
        if (pathParams || body) {
            return;
        }
    }
}

export { OfferMockController };
