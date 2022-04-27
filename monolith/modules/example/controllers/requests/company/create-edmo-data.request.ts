import { ApiProperty } from '@nestjs/swagger';

import { IsInt, IsString } from 'class-validator';

import { TransformToNumber } from '@zern/nest';

class CreateEdmoDataPathParams {
    @ApiProperty()
    @IsInt()
    @TransformToNumber()
    public readonly companyId: number;
}

class CreateEdmoDataBody {
    @ApiProperty()
    @IsString()
    public readonly edmoName: string;

    @ApiProperty()
    @IsString()
    public readonly edmId: string;
}

export { CreateEdmoDataPathParams, CreateEdmoDataBody };
