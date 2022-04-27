import { HttpStatus } from '@nestjs/common';

import { BaseHttpException } from '@zern/nest';

class AccountNotActiveHttpException extends BaseHttpException {
    public static readonly status: HttpStatus = HttpStatus.FORBIDDEN;

    public static readonly code: number = 3;

    protected static readonly description: string = 'Account is not active';

    public constructor (message: string) {
        super(message, AccountNotActiveHttpException);
    }
}

export { AccountNotActiveHttpException };
