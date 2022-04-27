import { ApiProperty } from '@nestjs/swagger';

import { IsInt, IsString } from 'class-validator';
import { HasMimeType, IsFile, MemoryStoredFile } from 'nestjs-form-data';

import { TransformToNumber } from '@zern/nest';

class UploadDealDocumentPathParams {
    @ApiProperty()
    @IsInt()
    @TransformToNumber()
    public readonly dealId: number;
}

class UploadDealDocumentBody {
    @ApiProperty({
        type: 'string',
        format: 'binary',
    })
    @IsFile()
    @HasMimeType(['application/pdf'])
    public readonly document: MemoryStoredFile;

    @ApiProperty()
    @IsString()
    public readonly type: string;
}

class UploadDealDocumentResponse {
    @ApiProperty()
    public readonly documentId: number;
}

export { UploadDealDocumentPathParams, UploadDealDocumentBody, UploadDealDocumentResponse };
