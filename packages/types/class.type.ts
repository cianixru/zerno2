type Class <T extends Record <string, unknown> = Record <string, unknown>, Args extends unknown[] = []> = new (...args: Args) => T;

export { Class };
