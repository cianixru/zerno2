import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import {
    ActionType,
    CreateProductActionBody,
    CreateProductActionPathParams,
    CreateWarehouseBody,
    CreateWarehousePathParams,
    CreateWarehouseProductBody,
    CreateWarehouseProductPathParams,
    CreateWarehouseProductResponse,
    CreateWarehouseResponse,
    GetProductActionsPathParams,
    GetProductActionsResponse,
    GetWarehouseProductsPathParams,
    GetWarehouseProductsResponse,
    GetWarehousesPathParams,
    GetWarehousesResponse,
    ProductType,
} from './requests';

@Controller()
@ApiTags('WarehouseMock')
@ApiBearerAuth()
class WarehouseMockController {
    @Get('mock/company/:companyId/warehouses')
    @ApiOkResponse({
        type: GetWarehousesResponse,
        description: 'Список складов успешно отправлен',
    })
    public async getWarehouses (
        @Param()
        pathParams: GetWarehousesPathParams,
    ): Promise <GetWarehousesResponse> {
        return {
            warehouses: [
                {
                    id: (pathParams.companyId - 3),
                    name: 'Складочек',
                    address: 'Читинская область, город Дмитров, шоссе Бухарестское, 56',
                },
                {
                    id: (pathParams.companyId - 2),
                    name: 'Складик',
                    address: 'Курская область, город Озёры, пр. Космонавтов, 35',
                },
                {
                    id: (pathParams.companyId - 1),
                    name: 'Складище',
                    address: 'Псковская область, город Волоколамск, бульвар Балканский, 23',
                },
            ],
        };
    }

    @Post('mock/company/:companyId/warehouse')
    @ApiCreatedResponse({
        type: CreateWarehouseResponse,
        description: 'Склад успешно создан',
    })
    public async createWarehouse (
        @Param()
        pathParams: CreateWarehousePathParams,

        @Body()
        body: CreateWarehouseBody,
    ): Promise <CreateWarehouseResponse> {
        return {
            warehouseId: (pathParams.companyId + (body ? 1 : 0)),
        };
    }

    @Get('mock/warehouse/:warehouseId/products')
    @ApiOkResponse({
        type: GetWarehouseProductsResponse,
        description: 'Список товаров на складе успешно отправлен',
    })
    public async getWarehouseProducts (
        @Param()
        pathParams: GetWarehouseProductsPathParams,
    ): Promise <GetWarehouseProductsResponse> {
        return {
            products: [
                {
                    id: (pathParams.warehouseId - 1),
                    type: ProductType.WHEAT_3,
                    params: {},
                },
                {
                    id: (pathParams.warehouseId + 1),
                    type: ProductType.CORN,
                    params: {},
                },
            ],
        };
    }

    @Post('mock/warehouse/:warehouseId/product')
    @ApiCreatedResponse({
        type: CreateWarehouseProductResponse,
        description: 'Товар на складе успешно создан',
    })
    public async createWarehouseProduct (
        @Param()
        pathParams: CreateWarehouseProductPathParams,

        @Body()
        body: CreateWarehouseProductBody,
    ): Promise <CreateWarehouseProductResponse> {
        return {
            productId: (pathParams.warehouseId + (body ? 1 : 0)),
        };
    }

    @Get('mock/warehouse/:warehouseId/product/:productId/actions')
    @ApiOkResponse({
        type: GetProductActionsResponse,
        description: 'Список действий с товаром успешно получен',
    })
    public async getProductActions (
        @Param()
        pathParams: GetProductActionsPathParams,
    ): Promise <GetProductActionsResponse> {
        if (!pathParams) {
            return {
                actions: [],
            };
        }

        return {
            actions: [
                {
                    type: ActionType.ADD,
                    params: {
                        value: 100,
                    },
                },
                {
                    type: ActionType.MOVE,
                    params: {
                        warehouseId: 123,
                        value: 20,
                    },
                },
            ],
        };
    }

    @Post('mock/warehouse/:warehouseId/product/:productId/action')
    @ApiCreatedResponse({
        description: 'Действие с товаром успешно создано',
    })
    public async createProductAction (
        @Param()
        pathParams: CreateProductActionPathParams,

        @Body()
        body: CreateProductActionBody,
    ): Promise <void> {
        if (pathParams || body) {
            return;
        }
    }
}

export { WarehouseMockController };
