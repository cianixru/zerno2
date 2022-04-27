import { ApiProperty } from '@nestjs/swagger';

class UpdateSessionResponse {
    @ApiProperty()
    public readonly accessToken: string;

    @ApiProperty()
    public readonly refreshToken: string;
}

export { UpdateSessionResponse };
