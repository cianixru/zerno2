import { ApiProperty } from '@nestjs/swagger';

import { IsJWT } from 'class-validator';

class UpdateSessionBody {
    @ApiProperty()
    @IsJWT()
    public readonly refreshToken: string;
}

export { UpdateSessionBody };
