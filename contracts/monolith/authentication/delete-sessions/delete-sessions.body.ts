import { ApiProperty } from '@nestjs/swagger';

import { IsBoolean, IsJWT } from 'class-validator';

class DeleteSessionsBody {
    @ApiProperty()
    @IsBoolean()
    public readonly retainCurrentSession: boolean;

    @ApiProperty()
    @IsJWT()
    public readonly refreshToken: string;
}

export { DeleteSessionsBody };
