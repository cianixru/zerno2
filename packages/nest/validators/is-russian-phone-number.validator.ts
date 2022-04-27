import { buildMessage, ValidateBy, ValidationOptions } from 'class-validator';

function isRussianPhoneNumber (phoneNumber: string | unknown): boolean {
    if (typeof phoneNumber !== 'string') {
        return false;
    }

    const russianPhoneNumberTemplate = /^\+7\d{10}$/;

    return russianPhoneNumberTemplate.test(phoneNumber);
}

function IsRussianPhoneNumber (validationOptions?: ValidationOptions) {
    return ValidateBy({
        name: 'isRussianPhoneNumber',
        validator: {
            validate (value: unknown): boolean {
                return isRussianPhoneNumber(value);
            },
            defaultMessage: buildMessage(
                (eachPrefix) => (eachPrefix + '$property must be a russian phone number (+70000000000)'),
                validationOptions,
            ),
        },
    }, validationOptions);
}

export { isRussianPhoneNumber, IsRussianPhoneNumber };
