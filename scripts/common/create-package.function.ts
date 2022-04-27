import { promises as fs } from 'fs';
import { join } from 'path';

import { rootDirectory } from './root-directory.constant';

type CurrentPackageJson = Awaited <typeof import('package.json')>;

type PackageJsonModule = {
    default: CurrentPackageJson;
};

type RequiredPackageJsonOptions = Omit <CurrentPackageJson, 'scripts' | 'devDependencies'>;

type PackageJsonOptions = RequiredPackageJsonOptions & {
    main: string;
};

const packageJsonName = 'package.json';

const { default: packageJson } = await import(join(rootDirectory, packageJsonName)) as PackageJsonModule;

const defaultRequiredPackageJsonOptions: RequiredPackageJsonOptions = {
    name: packageJson.name,
    version: packageJson.version,
    description: packageJson.description,
    license: packageJson.license,
    author: packageJson.author,
    type: packageJson.type,
    dependencies: packageJson.dependencies,
    private: packageJson.private,
};

async function createPackage (
    source: string,
    destination: string,
    packageJson: Partial <PackageJsonOptions> = { ...defaultRequiredPackageJsonOptions },
): Promise <void> {
    const packageJsonOptions = Object.assign({ ...defaultRequiredPackageJsonOptions }, packageJson);

    await fs.cp(source, destination, { recursive: true });

    await fs.writeFile(
        join(destination, packageJsonName),
        JSON.stringify(packageJsonOptions, null, 4),
    );
}

export { createPackage };
