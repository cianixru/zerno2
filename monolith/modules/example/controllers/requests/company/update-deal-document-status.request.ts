import { ApiProperty } from '@nestjs/swagger';

import { IsInt, IsString } from 'class-validator';

import { TransformToNumber } from '@zern/nest';

class UpdateDealDocumentStatusPathParams {
    @ApiProperty()
    @IsInt()
    @TransformToNumber()
    public readonly dealId: number;

    @ApiProperty()
    @IsInt()
    @TransformToNumber()
    public readonly documentId: number;
}

class UpdateDealDocumentStatusBody {
    @ApiProperty()
    @IsString()
    public readonly status: string;
}

export { UpdateDealDocumentStatusPathParams, UpdateDealDocumentStatusBody };
