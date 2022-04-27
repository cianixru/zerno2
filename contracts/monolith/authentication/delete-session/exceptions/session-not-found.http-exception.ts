import { HttpStatus } from '@nestjs/common';

import { BaseHttpException } from '@zern/nest';

class SessionNotFoundHttpException extends BaseHttpException {
    public static readonly status: HttpStatus = HttpStatus.NOT_FOUND;

    public static readonly code: number = 2;

    protected static readonly description: string = 'Session was updated or ended previously';

    public constructor (message: string) {
        super(message, SessionNotFoundHttpException);
    }
}

export { SessionNotFoundHttpException };
