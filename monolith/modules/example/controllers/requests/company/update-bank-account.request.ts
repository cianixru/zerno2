import { ApiProperty } from '@nestjs/swagger';

import { IsInt, IsOptional, IsString } from 'class-validator';

import { TransformToNumber } from '@zern/nest';

class UpdateBankAccountPathParams {
    @ApiProperty()
    @IsInt()
    @TransformToNumber()
    public readonly bankAccountId: number;
}

class UpdateBankAccountBody {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    public readonly bankName: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    public readonly settlementAccount: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    public readonly correspondentAccount: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    public readonly bic: string;
}

export { UpdateBankAccountPathParams, UpdateBankAccountBody };
