import { HttpStatus } from '@nestjs/common';

import { BaseHttpException } from '@zern/nest';

class RefreshTokenInvalidHttpException extends BaseHttpException {
    public static readonly status: HttpStatus = HttpStatus.FORBIDDEN;

    public static readonly code: number = 1;

    protected static readonly description: string = 'Refresh token is invalid';

    public constructor (message: string) {
        super(message, RefreshTokenInvalidHttpException);
    }
}

export { RefreshTokenInvalidHttpException };
