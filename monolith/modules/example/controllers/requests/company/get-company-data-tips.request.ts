import { ApiProperty } from '@nestjs/swagger';

import { IsString } from 'class-validator';

class GetCompanyDataTipsQueryParams {
    @ApiProperty()
    @IsString()
    public readonly query: string;
}

class CompanyData {
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
}

class GetCompanyDataTipsResponse {
    @ApiProperty({
        type: [CompanyData],
    })
    public readonly companies: CompanyData[];
}

export { GetCompanyDataTipsQueryParams, GetCompanyDataTipsResponse };
