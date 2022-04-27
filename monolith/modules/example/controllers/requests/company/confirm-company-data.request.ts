import { ApiProperty } from '@nestjs/swagger';

import { IsInt } from 'class-validator';

import { TransformToNumber } from '@zern/nest';

class ConfirmCompanyDataPathParams {
    @ApiProperty()
    @IsInt()
    @TransformToNumber()
    public readonly companyId: number;
}

export { ConfirmCompanyDataPathParams };
