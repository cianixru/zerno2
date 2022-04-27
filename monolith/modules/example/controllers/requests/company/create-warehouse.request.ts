import { ApiProperty } from '@nestjs/swagger';

import { IsInt, IsString } from 'class-validator';

import { TransformToNumber } from '@zern/nest';

class CreateWarehousePathParams {
    @ApiProperty()
    @IsInt()
    @TransformToNumber()
    public readonly companyId: number;
}

class CreateWarehouseBody {
    @ApiProperty()
    @IsString()
    public readonly name: string;

    @ApiProperty()
    @IsString()
    public readonly address: string;
}

class CreateWarehouseResponse {
    @ApiProperty()
    public readonly warehouseId: number;
}

export { CreateWarehousePathParams, CreateWarehouseBody, CreateWarehouseResponse };
