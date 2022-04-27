import { ApiProperty } from '@nestjs/swagger';

import { IsInt } from 'class-validator';

import { TransformToNumber } from '@zern/nest';

class DeleteBankAccountPathParams {
    @ApiProperty()
    @IsInt()
    @TransformToNumber()
    public readonly bankAccountId: number;
}

export { DeleteBankAccountPathParams };
