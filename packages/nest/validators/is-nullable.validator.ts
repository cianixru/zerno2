import { applyDecorators } from '@nestjs/common';

import { IsDefined, ValidateIf, ValidationOptions } from 'class-validator';

import { Nullable, Optional } from '@zern/types';

function isNullable (value: Optional <unknown>): boolean {
    return (value !== undefined);
}

function IsNullable (validationOptions?: ValidationOptions): PropertyDecorator {
    return applyDecorators(
        ValidateIf((_object, value: Nullable <unknown>) => (value !== null), validationOptions),
        IsDefined(validationOptions),
    );
}

export { isNullable, IsNullable };
