import { ApiProperty } from '@nestjs/swagger';

import { IsArray, IsInt } from 'class-validator';

import { TransformToNumberArray } from '@zern/nest';

import { GetUserResponse } from './get-user.request';

class GetUsersQueryParams {
    @ApiProperty({
        isArray: true,
        type: 'number',
    })
    @IsArray()
    @IsInt({ each: true })
    @TransformToNumberArray()
    public readonly companyIds: number[];
}

class GetUsersResponse {
    @ApiProperty({
        type: [GetUserResponse],
    })
    public readonly users: GetUserResponse[];
}

export { GetUsersQueryParams, GetUsersResponse };
