type PropertiesMap <
    Model extends Record <string, any>,
    Schema extends Record <string, any>,
> = Record <keyof Model, keyof Schema>;

export { PropertiesMap };
