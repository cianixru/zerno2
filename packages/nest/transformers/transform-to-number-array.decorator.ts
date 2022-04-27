import { Transform } from 'class-transformer';

function TransformToNumberArray (): PropertyDecorator {
    return Transform(({ value }) => {
        const items = (Array.isArray(value) ? value : [value]);

        return items.map((item: string) => Number.parseFloat(item));
    });
}

export { TransformToNumberArray };
