import { ApiProperty } from '@nestjs/swagger';

import { IsEnum, IsInt, IsObject } from 'class-validator';

import { TransformToNumber } from '@zern/nest';

import { ProductType } from './get-warehouse-products.request';

class CreateWarehouseProductPathParams {
    @ApiProperty()
    @IsInt()
    @TransformToNumber()
    public readonly warehouseId: number;
}

class CreateWarehouseProductBody {
    @ApiProperty({ enum: ProductType })
    @IsEnum(ProductType)
    public readonly type: ProductType;

    @ApiProperty({ type: 'object' })
    @IsObject()
    public readonly params: Record <string, unknown>;
}

class CreateWarehouseProductResponse {
    @ApiProperty()
    public readonly productId: number;
}

export { CreateWarehouseProductPathParams, CreateWarehouseProductBody, CreateWarehouseProductResponse };
