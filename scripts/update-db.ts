import * as path from 'node:path';
import { cloneRepository, compileDb, hasUncommittedChanges } from '../compiler';
import { getCheckedOutCommit } from '../compiler/utils';

const repository = 'tcgdex/cards-database';
const rootDirectory = path.resolve(import.meta.dirname, '..');
const cloneDirectory = path.resolve(rootDirectory, 'temp', 'tcgdex');
const srcDirectory = path.resolve(rootDirectory, 'src');
const branchOrTag = 'master';
let currentDbCommit: string | undefined;

try {
  const { COMMIT } = await import('../src/db/international');
  currentDbCommit = COMMIT;
} catch {
  // DB not yet compiled
}

process.stderr.write(`Cloning ${repository} - ${branchOrTag}\n`);
await cloneRepository(repository, cloneDirectory, branchOrTag);
const { commit, ref } = await getCheckedOutCommit(cloneDirectory);
const result: {
  hasChanges: boolean;
  message: string;
} = {
  hasChanges: false,
  message: 'No changes to commit',
};

// Only recompile if there are either:
// 1. Changes to the txgdex data.
// 2. FORCE_UPDATE is set to true (the compilation process was changed and data may be different)
if (currentDbCommit !== commit || process.env.FORCE_UPDATE === 'true') {
  process.stderr.write(`Compiling international database\n`);
  await compileDb(
    path.resolve(cloneDirectory, 'data'),
    path.resolve(srcDirectory, 'db', 'international')
  );

  process.stderr.write(`Compiling Asian database\n`);
  await compileDb(
    path.resolve(cloneDirectory, 'data-asia'),
    path.resolve(srcDirectory, 'db', 'asia'),
    {
      // Many set IDs in Asian data are not unique, use the file name as the ID instead, eg:
      //  * https://github.com/tcgdex/cards-database/blob/a26ef0e/data-asia/SM/AS6b.ts
      //  * https://github.com/tcgdex/cards-database/blob/a26ef0e/data-asia/SM/AS6D.ts
      useFileNameForSetId: true,
    }
  );
}

if (await hasUncommittedChanges(rootDirectory)) {
  result.hasChanges = true;
  result.message = `Updated tcgdex data to commit ${commit}${ref ? ` (ref: ${ref})` : ''}`;
}

process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
