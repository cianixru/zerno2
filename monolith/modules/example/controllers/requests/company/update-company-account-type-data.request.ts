import { ApiProperty } from '@nestjs/swagger';

import { IsEnum, IsInt } from 'class-validator';

import { TransformToNumber } from '@zern/nest';

import { CompanyAccountType } from './get-company-account-type-data.request';

class UpdateCompanyAccountTypeDataPathParams {
    @ApiProperty()
    @IsInt()
    @TransformToNumber()
    public readonly companyId: number;
}

class UpdateCompanyAccountTypeDataBody {
    @ApiProperty({ enum: CompanyAccountType })
    @IsEnum(CompanyAccountType)
    public readonly type: CompanyAccountType;
}

export { UpdateCompanyAccountTypeDataPathParams, UpdateCompanyAccountTypeDataBody };
