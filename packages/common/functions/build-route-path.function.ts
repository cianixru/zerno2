function buildRoutePath (parts: TemplateStringsArray, ...params: string[]): string {
    const prefixedParams = params.map(param => (':' + param));

    return String.raw(parts, prefixedParams);
}

export { buildRoutePath };
