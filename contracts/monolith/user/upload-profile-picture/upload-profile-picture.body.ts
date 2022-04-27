import { ApiProperty } from '@nestjs/swagger';

import { HasMimeType, IsFile, MemoryStoredFile } from 'nestjs-form-data';

class UploadProfilePictureBody {
    @ApiProperty({
        type: 'string',
        format: 'binary',
    })
    @IsFile()
    @HasMimeType(['image/jpeg', 'image/png'])
    public readonly profilePicture: MemoryStoredFile;
}

export { UploadProfilePictureBody };
