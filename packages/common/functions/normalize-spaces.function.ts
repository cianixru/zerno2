function normalizeSpaces (text: string): string {
    return text
        .trim()
        .replaceAll(/\s+/g, ' ');
}

export { normalizeSpaces };
