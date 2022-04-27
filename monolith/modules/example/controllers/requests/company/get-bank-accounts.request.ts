import { ApiProperty } from '@nestjs/swagger';

import { IsInt } from 'class-validator';

import { TransformToNumber } from '@zern/nest';

class GetBankAccountsPathParams {
    @ApiProperty()
    @IsInt()
    @TransformToNumber()
    public readonly companyId: number;
}

class BankAccount {
    @ApiProperty()
    public readonly id: number;

    @ApiProperty()
    public readonly bankName: string;

    @ApiProperty()
    public readonly settlementAccount: string;

    @ApiProperty()
    public readonly correspondentAccount: string;

    @ApiProperty()
    public readonly bic: string;
}

class GetBankAccountsResponse {
    @ApiProperty({
        type: [BankAccount],
    })
    public readonly bankAccounts: BankAccount[];
}

export { GetBankAccountsPathParams, GetBankAccountsResponse };
