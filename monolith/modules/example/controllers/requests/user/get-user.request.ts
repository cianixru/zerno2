import { ApiProperty } from '@nestjs/swagger';

import { Nullable } from '@zern/types';

class GetUserResponse {
    @ApiProperty()
    public readonly id: number;

    @ApiProperty()
    public readonly companyId: number;

    @ApiProperty()
    public readonly name: string;

    @ApiProperty()
    public readonly patronymic: string;

    @ApiProperty()
    public readonly surname: string;

    @ApiProperty({
        type: 'string',
        nullable: true,
    })
    public readonly position: Nullable <string>;

    @ApiProperty()
    public readonly phoneNumber: string;

    @ApiProperty()
    public readonly email: string;

    @ApiProperty()
    public readonly profilePictureUrl: string;
}

export { GetUserResponse };
