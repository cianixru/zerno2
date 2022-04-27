import { ApiProperty } from '@nestjs/swagger';

import { IsArray, IsInt } from 'class-validator';

import { TransformToNumberArray } from '@zern/nest';

class GetCompaniesDataQueryParams {
    @ApiProperty({
        isArray: true,
        type: 'number',
    })
    @IsArray()
    @IsInt({ each: true })
    @TransformToNumberArray()
    public readonly companyIds: number[];
}

class CompanyFullData {
    @ApiProperty()
    public readonly id: number;

    @ApiProperty()
    public readonly name: string;

    @ApiProperty()
    public readonly inn: string;

    @ApiProperty()
    public readonly kpp: string;

    @ApiProperty()
    public readonly codeOkved: string;

    @ApiProperty()
    public readonly director: string;

    @ApiProperty()
    public readonly legalAddress: string;

    @ApiProperty()
    public readonly actualAddress: string;

    @ApiProperty()
    public readonly usingNds: boolean;

    @ApiProperty()
    public readonly aicCharterMember: boolean;

    @ApiProperty()
    public readonly dataIsChecking: boolean;
}

class GetCompaniesDataResponse {
    @ApiProperty({
        type: [CompanyFullData],
    })
    public readonly companies: CompanyFullData[];
}

export { GetCompaniesDataQueryParams, GetCompaniesDataResponse };
