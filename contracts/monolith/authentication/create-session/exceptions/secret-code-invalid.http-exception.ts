import { HttpStatus } from '@nestjs/common';

import { BaseHttpException } from '@zern/nest';

class SecretCodeInvalidHttpException extends BaseHttpException {
    public static readonly status: HttpStatus = HttpStatus.FORBIDDEN;

    public static readonly code: number = 1;

    protected static readonly description: string = 'Секретный код введён неправильно или истёк срок его действия';

    public constructor (message: string) {
        super(message, SecretCodeInvalidHttpException);
    }
}

export { SecretCodeInvalidHttpException };
