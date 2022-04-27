import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

import { Response } from 'express';

import { BaseException, BaseHttpException } from '@zern/nest';

type ExceptionClass = {
    new (...args: any[]): BaseException,
};

type BaseHttpExceptionClass = {
    new (...args: any[]): BaseHttpException,
    status: typeof BaseHttpException ['status'],
    code: typeof BaseHttpException ['code'],
    getDescription: typeof BaseHttpException ['getDescription'],
};

type ExceptionMap = [BaseHttpExceptionClass, ExceptionClass, ...ExceptionClass[]];

@Catch(BaseException)
class MappingExceptionFilter implements ExceptionFilter {
    public constructor (
        private readonly exceptionMaps: ExceptionMap[],
    ) {
    }

    public catch (baseException: BaseException, host: ArgumentsHost): void {
        const context = host.switchToHttp();
        const response = context.getResponse <Response> ();

        const exception = this.mapException(baseException);

        const status = exception.getStatus();
        const { code, message } = exception;

        response
            .status(status)
            .json({ code, message });
    }

    private mapException (exception: BaseException): BaseHttpException {
        for (const [httpExceptionClass, ...exceptionClasses] of this.exceptionMaps) {
            const isMapHasExceptionClass = exceptionClasses.some(
                (exceptionClass) => (exception instanceof exceptionClass)
            );

            if (isMapHasExceptionClass) {
                return new httpExceptionClass(exception.message);
            }
        }

        return new BaseHttpException('Internal server error', BaseHttpException);
    }
}

export { MappingExceptionFilter, ExceptionMap };
