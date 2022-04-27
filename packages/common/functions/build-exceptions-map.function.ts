function buildExceptionsMap <T extends Record <string, any>> (module: T): Map <number, T[keyof T]> {
    const entries = Object.entries(module);

    const mappedEntries = entries.map(
        ([_, httpExceptionClass]) => ([httpExceptionClass.code as number, httpExceptionClass] as const)
    );

    return new Map(mappedEntries);
}

export { buildExceptionsMap };
