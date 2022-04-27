import { ApiProperty } from '@nestjs/swagger';

import { IsInt, IsNumber } from 'class-validator';

import { TransformToNumber } from '@zern/nest';

class CreateDealPathParams {
    @ApiProperty()
    @IsInt()
    @TransformToNumber()
    public readonly companyId: number;
}

class CreateDealBody {
    @ApiProperty()
    @IsNumber()
    public readonly offerId: number;
}

class CreateDealResponse {
    @ApiProperty()
    public readonly dealId: number;
}

export { CreateDealPathParams, CreateDealBody, CreateDealResponse };
