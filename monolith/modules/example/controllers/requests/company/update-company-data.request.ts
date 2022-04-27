import { ApiProperty } from '@nestjs/swagger';

import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

import { IsCodeOkved, TransformToNumber } from '@zern/nest';

class UpdateCompanyDataPathParams {
    @ApiProperty()
    @IsInt()
    @TransformToNumber()
    public readonly companyId: number;
}

class UpdateCompanyDataBody {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    public readonly name: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    public readonly inn: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    public readonly kpp: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsCodeOkved()
    public readonly codeOkved: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    public readonly director: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    public readonly legalAddress: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    public readonly actualAddress: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsBoolean()
    public readonly usingNds: boolean;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsBoolean()
    public readonly aicCharterMember: boolean;
}

export { UpdateCompanyDataPathParams, UpdateCompanyDataBody };
