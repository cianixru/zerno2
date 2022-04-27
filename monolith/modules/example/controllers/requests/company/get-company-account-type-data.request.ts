import { ApiProperty } from '@nestjs/swagger';

import { IsEnum, IsInt } from 'class-validator';

import { TransformToNumber } from '@zern/nest';

enum CompanyAccountType {
    BUYER = 'buyer',
    FARMER = 'farmer',
    TRADER = 'trader',
}

class GetCompanyAccountTypeDataPathParams {
    @ApiProperty()
    @IsInt()
    @TransformToNumber()
    public readonly companyId: number;
}

class CompanyAccountTypeData {
    @ApiProperty({ enum: CompanyAccountType })
    @IsEnum(CompanyAccountType)
    public readonly type: CompanyAccountType;

    @ApiProperty()
    public readonly dataIsChecking: boolean;
}

class GetCompanyAccountTypeDataResponse {
    @ApiProperty({
        type: CompanyAccountTypeData,
        nullable: true,
    })
    public readonly accountType: CompanyAccountTypeData | null;
}

export { CompanyAccountType, GetCompanyAccountTypeDataPathParams, GetCompanyAccountTypeDataResponse };
