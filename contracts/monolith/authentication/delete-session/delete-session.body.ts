import { ApiProperty } from '@nestjs/swagger';

import { IsJWT } from 'class-validator';

class DeleteSessionBody {
    @ApiProperty()
    @IsJWT()
    public readonly refreshToken: string;
}

export { DeleteSessionBody };
