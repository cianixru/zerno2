import { ApiProperty } from '@nestjs/swagger';

import { IsInt } from 'class-validator';

import { TransformToNumber } from '@zern/nest';

enum ProductType {
    WHEAT_3 = 'wheat_3',
    WHEAT_4 = 'wheat_4',
    WHEAT_5 = 'wheat_5',
    RAPE = 'rape',
    SUNFLOWER = 'sunflower',
    CORN = 'corn',
    HORDEUM = 'hordeum',
}

class GetWarehouseProductsPathParams {
    @ApiProperty()
    @IsInt()
    @TransformToNumber()
    public readonly warehouseId: number;
}

class ProductData {
    @ApiProperty()
    public readonly id: number;

    @ApiProperty({ enum: ProductType })
    public readonly type: ProductType;

    @ApiProperty({ type: 'object' })
    public readonly params: Record <string, unknown>;
}

class GetWarehouseProductsResponse {
    @ApiProperty({
        type: [ProductData],
    })
    public readonly products: ProductData[];
}

export { ProductType, GetWarehouseProductsPathParams, GetWarehouseProductsResponse };
