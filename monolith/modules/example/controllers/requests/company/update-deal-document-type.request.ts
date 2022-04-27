import { ApiProperty } from '@nestjs/swagger';

import { IsInt, IsString } from 'class-validator';

import { TransformToNumber } from '@zern/nest';

class UpdateDealDocumentTypePathParams {
    @ApiProperty()
    @IsInt()
    @TransformToNumber()
    public readonly dealId: number;

    @ApiProperty()
    @IsInt()
    @TransformToNumber()
    public readonly documentId: number;
}

class UpdateDealDocumentTypeBody {
    @ApiProperty()
    @IsString()
    public readonly status: string;
}

export { UpdateDealDocumentTypePathParams, UpdateDealDocumentTypeBody };
