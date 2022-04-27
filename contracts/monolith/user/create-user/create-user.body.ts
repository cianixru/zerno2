import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsString, MinLength } from 'class-validator';

import { IsNullable } from '@zern/nest';
import { Nullable } from '@zern/types';

class CreateUserBody {
    @ApiProperty({ minLength: 1 })
    @IsString()
    @MinLength(1)
    public readonly name: string;

    @ApiProperty({
        type: 'string',
        minLength: 1,
        nullable: true,
    })
    @IsNullable()
    @IsString()
    @MinLength(1)
    public readonly patronymic: Nullable <string>;

    @ApiProperty({ minLength: 1 })
    @IsString()
    @MinLength(1)
    public readonly surname: string;

    @ApiProperty({
        type: 'string',
        minLength: 1,
        nullable: true,
    })
    @IsNullable()
    @IsString()
    @MinLength(1)
    public readonly position: Nullable <string>;

    @ApiProperty()
    @IsEmail()
    public readonly email: string;
}

export { CreateUserBody };
