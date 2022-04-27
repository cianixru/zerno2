import { ApiProperty } from '@nestjs/swagger';

import { IsEnum, IsInt, IsObject } from 'class-validator';

import { TransformToNumber } from '@zern/nest';

import { ActionType } from './get-product-actions.request';

class CreateProductActionPathParams {
    @ApiProperty()
    @IsInt()
    @TransformToNumber()
    public readonly warehouseId: number;

    @ApiProperty()
    @IsInt()
    @TransformToNumber()
    public readonly productId: number;
}

class CreateProductActionBody {
    @ApiProperty({ enum: ActionType })
    @IsEnum(ActionType)
    public readonly type: ActionType;

    @ApiProperty({ type: 'object' })
    @IsObject()
    public readonly params: Record <string, unknown>;
}

export { CreateProductActionPathParams, CreateProductActionBody };
