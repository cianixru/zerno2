import { ApiProperty } from '@nestjs/swagger';

import { IsArray, IsInt } from 'class-validator';

import { TransformToNumberArray } from '@zern/nest';

class GetDealsQueryParams {
    @ApiProperty({
        isArray: true,
        type: 'number',
    })
    @IsArray()
    @IsInt({ each: true })
    @TransformToNumberArray()
    public readonly companyIds: number[];
}

class DealData {
    @ApiProperty()
    public readonly id: number;

    @ApiProperty()
    public readonly offerId: number;

    @ApiProperty()
    public readonly companyId: number;

    @ApiProperty()
    public readonly status: string;
}

class GetDealsResponse {
    @ApiProperty({
        type: [DealData],
    })
    public readonly deals: DealData[];
}

export { GetDealsQueryParams, GetDealsResponse };
