import { ApiProperty } from '@nestjs/swagger';

import { IsInt } from 'class-validator';

import { TransformToNumber } from '@zern/nest';

class GetDealSpecificationPathParams {
    @ApiProperty()
    @IsInt()
    @TransformToNumber()
    public readonly dealId: number;
}

class GetDealSpecificationResponse {
    @ApiProperty()
    public readonly productType: string;

    @ApiProperty()
    public readonly count: number;

    @ApiProperty()
    public readonly price: number;

    @ApiProperty()
    public readonly address: string;

    @ApiProperty()
    public readonly status: string;

    @ApiProperty({ type: 'object' })
    public readonly parameters: Record <string, unknown>;
}

export { GetDealSpecificationPathParams, GetDealSpecificationResponse };
