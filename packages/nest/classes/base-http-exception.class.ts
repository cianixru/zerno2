import { HttpException, HttpStatus } from '@nestjs/common';

class BaseHttpException extends HttpException {
    public static readonly status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

    public static readonly code: number = -1;

    protected static readonly description: string = 'Description not provided';

    public readonly code: number;

    public constructor (message: string, httpExceptionClass: typeof BaseHttpException) {
        const { status, code } = httpExceptionClass;

        super(message, status);

        this.code = code;
    }

    public static getDescription (): string {
        return this.description;
    }
}

export { BaseHttpException };
