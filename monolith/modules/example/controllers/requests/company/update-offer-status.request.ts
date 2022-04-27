import { ApiProperty } from '@nestjs/swagger';

import { IsInt } from 'class-validator';

import { TransformToNumber } from '@zern/nest';

class UpdateOfferStatusPathParams {
    @ApiProperty()
    @IsInt()
    @TransformToNumber()
    public readonly companyId: number;

    @ApiProperty()
    @IsInt()
    @TransformToNumber()
    public readonly offerId: number;
}

class UpdateOfferStatusBody {
    @ApiProperty()
    public readonly status: string;
}

export { UpdateOfferStatusPathParams, UpdateOfferStatusBody };
