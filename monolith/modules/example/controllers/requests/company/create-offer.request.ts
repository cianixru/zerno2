import { ApiProperty } from '@nestjs/swagger';

import { IsInt } from 'class-validator';

import { TransformToNumber } from '@zern/nest';

class CreateOfferPathParams {
    @ApiProperty()
    @IsInt()
    @TransformToNumber()
    public readonly companyId: number;
}

class CreateOfferBody {
    @ApiProperty()
    public readonly companyId: number;

    @ApiProperty()
    public readonly productType: string;

    @ApiProperty()
    public readonly offerType: string;

    @ApiProperty()
    public readonly count: number;

    @ApiProperty()
    public readonly price: number;

    @ApiProperty()
    public readonly address: string;

    @ApiProperty({ type: 'object' })
    public readonly parameters: Record <string, unknown>;
}

class CreateOfferResponse {
    @ApiProperty()
    public readonly offerId: number;
}

export { CreateOfferPathParams, CreateOfferBody, CreateOfferResponse };
