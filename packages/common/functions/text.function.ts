import { normalizeSpaces } from './normalize-spaces.function';

function text (strings: TemplateStringsArray, ...values: string[]): string {
    const rawText = String.raw(strings, ...values);

    return normalizeSpaces(rawText);
}

export { text };
