import { ApiProperty } from '@nestjs/swagger';

import { IsInt } from 'class-validator';

import { TransformToNumber } from '@zern/nest';

class GetDealDocumentsPathParams {
    @ApiProperty()
    @IsInt()
    @TransformToNumber()
    public readonly dealId: number;
}

class DocumentData {
    @ApiProperty()
    public readonly id: number;

    @ApiProperty()
    public readonly type: string;

    @ApiProperty()
    public readonly status: string;

    @ApiProperty()
    public readonly documentUrl: string;
}

class GetDealDocumentsResponse {
    @ApiProperty({
        type: [DocumentData],
    })
    public readonly documents: DocumentData[];
}

export { GetDealDocumentsPathParams, GetDealDocumentsResponse };
