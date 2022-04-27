import { ApiProperty } from '@nestjs/swagger';

import { IsInt, IsOptional, IsString } from 'class-validator';

import { TransformToNumber } from '@zern/nest';

class UpdateEdmoDataPathParams {
    @ApiProperty()
    @IsInt()
    @TransformToNumber()
    public readonly companyId: number;
}

class UpdateEdmoDataBody {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    public readonly edmoName: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    public readonly edmId: string;
}

export { UpdateEdmoDataPathParams, UpdateEdmoDataBody };
