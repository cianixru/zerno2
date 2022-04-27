import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

import { Nullable } from '@zern/types';

class UpdateUserBody {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    public readonly name: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    public readonly patronymic: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    public readonly surname: string;

    @ApiProperty({
        type: 'string',
        minLength: 1,
        nullable: true,
        required: false,
    })
    @IsOptional()
    @IsString()
    @MinLength(1)
    public readonly position: Nullable <string>;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsEmail()
    public readonly email: string;
}

export { UpdateUserBody };
