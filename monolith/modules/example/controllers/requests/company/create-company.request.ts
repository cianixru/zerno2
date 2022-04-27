import { ApiProperty } from '@nestjs/swagger';

import { IsBoolean, IsString } from 'class-validator';

import { IsCodeOkved } from '@zern/nest';

class CreateCompanyBody {
    @ApiProperty()
    @IsString()
    public readonly name: string;

    @ApiProperty()
    @IsString()
    public readonly inn: string;

    @ApiProperty()
    @IsString()
    public readonly kpp: string;

    @ApiProperty()
    @IsCodeOkved()
    public readonly codeOkved: string;

    @ApiProperty()
    @IsString()
    public readonly director: string;

    @ApiProperty()
    @IsString()
    public readonly legalAddress: string;

    @ApiProperty()
    @IsString()
    public readonly actualAddress: string;

    @ApiProperty()
    @IsBoolean()
    public readonly usingNds: boolean;

    @ApiProperty()
    @IsBoolean()
    public readonly aicCharterMember: boolean;
}

class CreateCompanyResponse {
    @ApiProperty()
    public readonly companyId: number;
}

export { CreateCompanyBody, CreateCompanyResponse };
