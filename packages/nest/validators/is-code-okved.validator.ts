import { buildMessage, ValidateBy, ValidationOptions } from 'class-validator';

function isCodeOkved (codeOkved: string | unknown): boolean {
    if (typeof codeOkved !== 'string') {
        return false;
    }

    const okvedCodeTemplate = /^\d{2}(?:\.(?:\d|\d{2}(?:\.\d{1,2})?))?$/;

    return okvedCodeTemplate.test(codeOkved);
}

function IsCodeOkved (validationOptions?: ValidationOptions) {
    return ValidateBy({
        name: 'isCodeOkved',
        validator: {
            validate (value: unknown): boolean {
                return isCodeOkved(value);
            },
            defaultMessage: buildMessage(
                (eachPrefix) => (eachPrefix + '$property must be a valid code okved (XX.XX or XX.XX.XX)'),
                validationOptions,
            ),
        },
    }, validationOptions);
}

export { isCodeOkved, IsCodeOkved };
