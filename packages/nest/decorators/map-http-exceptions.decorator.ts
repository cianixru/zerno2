import { applyDecorators, UseFilters } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

import { normalizeSpaces } from '@zern/common';

import { ExceptionMap, MappingExceptionFilter } from '../filters';

function buildApiResponseSchema (code: number): SchemaObject {
    return {
        type: 'object',
        properties: {
            code: {
                type: 'number',
                example: code,
            },
            message: {
                type: 'string',
            },
        },
    };
}

function generateApiResponses (exceptionMaps: [ExceptionMap, ...ExceptionMap[]]): MethodDecorator[] {
    return exceptionMaps.map(([exceptionClass]) => {
        const rawDescription = exceptionClass.getDescription();
        const description = normalizeSpaces(rawDescription);

        return ApiResponse({
            status: exceptionClass.status,
            schema: buildApiResponseSchema(exceptionClass.code),
            description,
        });
    });
}

function MapHttpExceptions (exceptionMaps: [ExceptionMap, ...ExceptionMap[]]) {
    const apiResponses = generateApiResponses(exceptionMaps);
    const mappingExceptionFilter = new MappingExceptionFilter(exceptionMaps);

    return applyDecorators(
        ...apiResponses,
        UseFilters(mappingExceptionFilter),
    );
}

export { MapHttpExceptions };
