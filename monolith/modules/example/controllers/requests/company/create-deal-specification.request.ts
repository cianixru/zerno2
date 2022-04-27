import { ApiProperty } from '@nestjs/swagger';

import { IsInt, IsNumber, IsObject, IsString } from 'class-validator';

import { TransformToNumber } from '@zern/nest';

class CreateDealSpecificationPathParams {
    @ApiProperty()
    @IsInt()
    @TransformToNumber()
    public readonly dealId: number;
}

class CreateDealSpecificationBody {
    @ApiProperty()
    @IsString()
    public readonly productType: string;

    @ApiProperty()
    @IsNumber()
    public readonly count: number;

    @ApiProperty()
    @IsNumber()
    public readonly price: number;

    @ApiProperty()
    @IsString()
    public readonly address: string;

    @ApiProperty({ type: 'object' })
    @IsObject()
    public readonly parameters: Record <string, unknown>;
}

export { CreateDealSpecificationPathParams, CreateDealSpecificationBody };
