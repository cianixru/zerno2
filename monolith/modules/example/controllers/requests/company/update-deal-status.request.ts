import { ApiProperty } from '@nestjs/swagger';

import { IsInt, IsString } from 'class-validator';

import { TransformToNumber } from '@zern/nest';

class UpdateDealStatusPathParams {
    @ApiProperty()
    @IsInt()
    @TransformToNumber()
    public readonly dealId: number;
}

class UpdateDealStatusBody {
    @ApiProperty()
    @IsString()
    public readonly status: string;
}

export { UpdateDealStatusPathParams, UpdateDealStatusBody };
