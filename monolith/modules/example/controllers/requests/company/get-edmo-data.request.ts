import { ApiProperty } from '@nestjs/swagger';

import { IsInt } from 'class-validator';

import { TransformToNumber } from '@zern/nest';

class GetEdmoDataPathParams {
    @ApiProperty()
    @IsInt()
    @TransformToNumber()
    public readonly companyId: number;
}

class EdmoData {
    @ApiProperty()
    public readonly edmoName: string;

    @ApiProperty()
    public readonly edmId: string;

    @ApiProperty()
    public readonly dataIsChecking: boolean;
}

class GetEdmoDataResponse {
    @ApiProperty({
        type: EdmoData,
        nullable: true,
    })
    public readonly edmo: EdmoData | null;
}

export { GetEdmoDataPathParams, GetEdmoDataResponse };
