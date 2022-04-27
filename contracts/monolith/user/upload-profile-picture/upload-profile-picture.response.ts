import { ApiProperty } from '@nestjs/swagger';

class UploadProfilePictureResponse {
    @ApiProperty()
    public readonly profilePictureUrl: string;
}

export { UploadProfilePictureResponse };
