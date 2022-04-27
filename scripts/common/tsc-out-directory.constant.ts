import { promises as fs } from 'fs';
import { join } from 'path';

import { parse } from 'comment-json';

import { rootDirectory } from '../common';

type TSConfig = Awaited <typeof import('tsconfig.json')>;

const tsconfig = await fs.readFile(join(rootDirectory, 'tsconfig.json'));

const { compilerOptions } = parse(tsconfig.toString()) as unknown as TSConfig;

const tscOutDirectory = compilerOptions.outDir;

export { tscOutDirectory };
