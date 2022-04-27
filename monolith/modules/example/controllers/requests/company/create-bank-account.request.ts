import { ApiProperty } from '@nestjs/swagger';

import { IsInt, IsString } from 'class-validator';

import { TransformToNumber } from '@zern/nest';

class CreateBankAccountPathParams {
    @ApiProperty()
    @IsInt()
    @TransformToNumber()
    public readonly companyId: number;
}

class CreateBankAccountBody {
    @ApiProperty()
    @IsString()
    public readonly bankName: string;

    @ApiProperty()
    @IsString()
    public readonly settlementAccount: string;

    @ApiProperty()
    @IsString()
    public readonly correspondentAccount: string;

    @ApiProperty()
    @IsString()
    public readonly bic: string;
}

class CreateBankAccountResponse {
    @ApiProperty()
    public readonly bankAccountId: number;
}

export { CreateBankAccountPathParams, CreateBankAccountBody, CreateBankAccountResponse };
