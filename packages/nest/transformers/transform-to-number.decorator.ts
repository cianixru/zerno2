import { Transform } from 'class-transformer';

function TransformToNumber (): PropertyDecorator {
    return Transform(({ value }) => Number.parseFloat(value));
}

export { TransformToNumber };
