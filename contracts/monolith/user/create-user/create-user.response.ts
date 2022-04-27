import { ApiProperty } from '@nestjs/swagger';

class CreateUserResponse {
    @ApiProperty()
    public readonly userId: number;
}

export { CreateUserResponse };
