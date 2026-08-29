import * as path from 'node:path';
import * as fs from 'node:fs/promises';
import { execa } from 'execa';
import sanitize from 'sanitize-filename';

const rootDir = path.resolve(import.meta.dirname, '..');
const changesetsFile = path.resolve(rootDir, 'changesets.json');
const changesetsDirectory = path.resolve(rootDir, '.changeset');
let hasChangesets = false;

try {
  await execa({ cwd: rootDir })`npx changeset status --since main -o ${changesetsFile}`;
  hasChangesets = true;
} catch {
  // no changesets added
}

if (hasChangesets) {
  const { changesets } = JSON.parse((await fs.readFile(changesetsFile)).toString('utf-8')) as {
    changesets: Array<{ id: string }>;
  };
  await Promise.all(
    changesets.map((changeset) =>
      fs.unlink(path.resolve(changesetsDirectory, `${sanitize(changeset.id)}.md`))
    )
  );
  await fs.unlink(changesetsFile);
}
