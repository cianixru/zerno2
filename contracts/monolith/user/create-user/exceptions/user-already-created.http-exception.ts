import { HttpStatus } from '@nestjs/common';

import { BaseHttpException } from '@zern/nest';

class UserAlreadyCreatedHttpException extends BaseHttpException {
    public static readonly status: HttpStatus = HttpStatus.FORBIDDEN;

    public static readonly code: number = 1;

    protected static readonly description: string = 'Пользователь уже существует';

    public constructor (message: string) {
        super(message, UserAlreadyCreatedHttpException);
    }
}

export { UserAlreadyCreatedHttpException };
