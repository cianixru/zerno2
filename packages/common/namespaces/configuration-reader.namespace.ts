import { readFileSync } from 'fs';

const envs = process.env;

namespace ConfigurationReader {
    export class EnvNotFoundError extends Error {
        public constructor (name: string) {
            super(`Env "${name}" not found`);
        }
    }

    export class EnvNotFiniteNumberError extends Error {
        public constructor (name: string) {
            super(`Env "${name}" not a finite number`);
        }
    }

    export class CannotReadFileError extends Error {
        public readonly originalError: Error;

        public constructor (name: string, path: string, error: Error) {
            super(`Cannot read file by path "${path}" from env "${name}"`);

            this.originalError = error;
        }
    }

    export function getString (name: string): string {
        const value = envs[name];

        if (value === undefined) {
            throw new EnvNotFoundError(name);
        }

        return value;
    }

    export function getNumber (name: string): number {
        const value = getString(name);

        const x = Number.parseFloat(value);

        if (Number.isNaN(x)) {
            throw new EnvNotFiniteNumberError(name);
        }

        return x;
    }

    export function readFile (name: string): string {
        const path = getString(name);

        try {
            const rawFile = readFileSync(path, { encoding: 'utf-8' });

            return rawFile.slice(0, -1);
        } catch (error: unknown) {
            throw new CannotReadFileError(name, path, error as Error);
        }
    }

    export function readStringArray (name: string, separator: string): string[] {
        const stringifiedArray = getString(name);

        return ((stringifiedArray.length === 0) ? [] : stringifiedArray.split(separator));
    }
}

export { ConfigurationReader };
