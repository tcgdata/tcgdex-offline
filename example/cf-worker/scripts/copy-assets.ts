import { fileURLToPath } from 'node:url';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';

const source = path.resolve(
  path.dirname(fileURLToPath(import.meta.resolve('@tcgdata/tcgdex-offline'))),
  'db'
);
const outDir = path.resolve(import.meta.dirname, '..', 'public', 'db');

await fs.mkdir(outDir, { recursive: true });
await fs.cp(source, outDir, {
  recursive: true,
  filter: async (source: string): Promise<boolean> => {
    return source.endsWith('.json') || (await fs.stat(source)).isDirectory();
  },
});
