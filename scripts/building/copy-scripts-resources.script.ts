import { promises as fs } from 'fs';
import { join } from 'path';

import { rootDirectory, tscOutDirectory } from '../common';

const scriptsResourcesPath = 'scripts/resources/';

await fs.cp(
    join(rootDirectory, scriptsResourcesPath),
    join(tscOutDirectory, scriptsResourcesPath),
    { recursive: true }
);
