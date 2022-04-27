import { promises as fs } from 'fs';
import { join } from 'path';

import { parse } from 'comment-json';

import { createPackage, rootDirectory } from '../common';

type PackageJson = Exclude <Parameters <typeof createPackage> [2], undefined>;
type TSConfig = Awaited <typeof import('tsconfig.json')>;

type AliasInformation = {
    value: string;
    isTemplated: boolean;
};

const tsconfig = await fs.readFile(join(rootDirectory, 'tsconfig.json'));

const { compilerOptions } = parse(tsconfig.toString()) as unknown as TSConfig;
const { paths } = compilerOptions;

function parseAlias (value: string): AliasInformation {
    const isTemplated = value.endsWith('/*');

    return {
        value: (isTemplated ? value.slice(0, -2) : value),
        isTemplated,
    };
}

function parsePath (value: string): string {
    return (value.endsWith('*') ? value.slice(0, -1) : value);
}

for (const [rawAlias, [rawPath]] of Object.entries(paths as Record <string, string[]>)) {
    const alias = parseAlias(rawAlias);
    const path = parsePath(rawPath);

    const packageJson: PackageJson = {
        name: alias.value,
    };

    if (!alias.isTemplated) {
        packageJson.main = 'index.js';
    }

    const source = join(rootDirectory, path);
    const destination = join(rootDirectory, 'node_modules', alias.value);

    await createPackage(source, destination, packageJson);
}
