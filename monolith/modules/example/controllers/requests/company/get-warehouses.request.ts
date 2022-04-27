import { ApiProperty } from '@nestjs/swagger';

import { IsInt } from 'class-validator';

import { TransformToNumber } from '@zern/nest';

class GetWarehousesPathParams {
    @ApiProperty()
    @IsInt()
    @TransformToNumber()
    public readonly companyId: number;
}

class WarehouseData {
    @ApiProperty()
    public readonly id: number;

    @ApiProperty()
    public readonly name: string;

    @ApiProperty()
    public readonly address: string;
}

class GetWarehousesResponse {
    @ApiProperty({
        type: [WarehouseData],
    })
    public readonly warehouses: WarehouseData[];
}

export { GetWarehousesPathParams, GetWarehousesResponse };
