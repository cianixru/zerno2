import { HttpStatus } from '@nestjs/common';

import { BaseHttpException } from '@zern/nest';

class SecretCodeNotSentHttpException extends BaseHttpException {
    public static readonly status: HttpStatus = HttpStatus.FORBIDDEN;

    public static readonly code: number = 1;

    protected static readonly description: string = 'Secret code was not sent';

    public constructor (message: string) {
        super(message, SecretCodeNotSentHttpException);
    }
}

export { SecretCodeNotSentHttpException };
