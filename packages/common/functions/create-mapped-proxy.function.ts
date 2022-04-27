import { Optional } from '@zern/types';

function createMappedProxy <ProxiedObject extends Record <string, any>> (
    proxiedObject: ProxiedObject,
    sourceObject: Record <string, any>,
    map: Record <string, string>,
): ProxiedObject {
    return new Proxy (proxiedObject, {
        get (_proxiedObject: ProxiedObject, propertyName: string): unknown {
            return sourceObject[map[propertyName]];
        },

        getOwnPropertyDescriptor (_proxiedObject: ProxiedObject, propertyName: string): Optional <PropertyDescriptor> {
            if (!(propertyName in map)) {
                return;
            }

            return {
                configurable: true,
                enumerable: true,
                value: sourceObject[map[propertyName]],
                writable: true,
            };
        },

        getPrototypeOf (proxiedObject: ProxiedObject): object | null {
            return Reflect.getPrototypeOf(proxiedObject);
        },

        has (_proxiedObject: ProxiedObject, propertyName: string): boolean {
            return (propertyName in map);
        },

        ownKeys (): (symbol | string)[] {
            return Reflect.ownKeys(map);
        },

        set (_proxiedObject: ProxiedObject, propertyName: string, value: unknown): boolean {
            sourceObject[map[propertyName]] = value;

            return true;
        },
    });
}

export { createMappedProxy };
