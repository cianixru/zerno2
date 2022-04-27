import { ApiProperty } from '@nestjs/swagger';

class CreateSessionResponse {
    @ApiProperty()
    public readonly accessToken: string;

    @ApiProperty()
    public readonly refreshToken: string;
}

export { CreateSessionResponse };
