import * as path from 'node:path';
import * as fs from 'node:fs/promises';
import { z } from 'zod';
import { execa, ExecaError } from 'execa';
import { glob } from 'glob';
import { extractFile } from './parser';
import { RawSeriesSchema, RawSetSchema, RawCardSchema, RawCard } from '../src/schemas';
import { CompileDbOptions, CompiledDb, UnnestArray } from './types';

export const getLatestReleaseTag = async (repository: string): Promise<string> => {
  const response = await fetch(
    `https://api.github.com/repos/${encodeURIComponent(repository)}/releases/latest`
  );

  if (response.status !== 200) {
    throw new Error(
      `Received unexpected response status ${response.status}: ${await response.text()}`
    );
  }

  const body = z
    .object({
      tag_name: z.string(),
    })
    .parse(await response.json());

  return body.tag_name;
};

export const getCheckedOutCommit = async (
  directory: string
): Promise<{ commit: string; ref?: string }> => {
  try {
    const [{ stdout: commit }, { stdout: refs }] = await Promise.all([
      await execa({ cwd: directory })`git rev-parse HEAD`,
      await execa({ cwd: directory })`git show-ref`,
    ]);

    const commitAndRef = refs
      ?.split('\n')
      .find((line) => line.startsWith(`${commit} `))
      ?.split(' ');
    const ref = commitAndRef?.[1].replace(/^(refs\/heads|refs)\//, '');

    return { commit, ref };
  } catch (e) {
    if (e instanceof ExecaError) {
      throw new Error(`Cannot identify git commit/ref for directory "${directory}"`, { cause: e });
    }

    throw e;
  }
};

export const hasUncommittedChanges = async (directory: string): Promise<boolean> => {
  const { stdout } = await execa({ cwd: directory })`git status --porcelain`;

  return stdout.trim().length > 0;
};

export const exists = async (path: string): Promise<boolean> => {
  try {
    await fs.access(path);
    return true;
  } catch (e) {
    if (e instanceof Error && 'code' in e && e.code === 'ENOENT') {
      return false;
    }

    throw e;
  }
};

export const cloneRepository = async (
  repository: string,
  directory: string,
  tagOrBranch: string
): Promise<void> => {
  await fs.mkdir(directory, { recursive: true });

  // Github actions can't clone 3rd party repo via SSH "Permission denied (publickey)"
  // Use HTTPS URL when running in action.
  const repositoryUrl = process.env.CI
    ? `https://github.com/${repository}.git`
    : `git@github.com:${repository}.git`;
  const currentCommit = (await exists(path.join(directory, '.git')))
    ? await getCheckedOutCommit(directory)
    : undefined;

  if (currentCommit) {
    if (currentCommit.ref === tagOrBranch) {
      // already checked out
      return;
    } else {
      await execa({
        cwd: directory,
      })`git remote set-branches --add origin ${tagOrBranch}`;
      await execa({
        cwd: directory,
      })`git fetch --depth 1 origin ${tagOrBranch}`;

      if (tagOrBranch.startsWith('tags/')) {
        await execa({ cwd: directory })`git switch --detach ${tagOrBranch}`;
      } else {
        await execa({ cwd: directory })`git switch ${tagOrBranch}`;
      }
    }
  } else {
    const ref = tagOrBranch.replace(/^tags\//, '');
    await execa({
      stdio: 'inherit',
    })`git clone --branch ${ref} --depth 1 ${repositoryUrl} ${directory}`;
  }
};

export const toScreamingSnakeCase = (string: string): string => {
  return string
    .toUpperCase()
    .replace(/&/g, 'AND')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/-/g, ' ')
    .replace(/[^a-zA-Z0-9 _]/g, '')
    .trim()
    .replace(/\s+/g, '_');
};

export const buildCardAttributeHash = <T>(
  cards: Array<RawCard>,
  getCardValue: (card: RawCard) => T
): Record<string, UnnestArray<T> | Array<UnnestArray<T>>> => {
  const uniqueValues = new global.Set<UnnestArray<T>>();
  const hash: Record<string, UnnestArray<T> | Array<UnnestArray<T>>> = {};

  cards.forEach((card) => {
    const value = getCardValue(card);

    if (value instanceof Array) {
      value.map((item) => uniqueValues.add(item));
    } else {
      uniqueValues.add(value as UnnestArray<T>);
    }
  });

  Array.from(uniqueValues)
    .sort()
    .forEach((value) => {
      if (!value) {
        return;
      }

      const key = toScreamingSnakeCase(String(value));

      if (key in hash) {
        if (hash[key] instanceof Array) {
          hash[key].push(value);
        } else {
          hash[key] = [hash[key], value];
        }
      } else {
        hash[key] = value;
      }
    });

  return hash;
};

const normalizeId = (id: unknown): string | undefined => {
  return typeof id === 'string' && id !== 'null' && id !== 'undefined' ? id : undefined;
};

export const flattenCards = (cards: Record<string, Array<RawCard>>): Array<RawCard> => {
  const flattened: Array<RawCard> = [];

  Object.values(cards).forEach((card) => {
    flattened.push(...card);
  });

  return flattened;
};

export const sortObjectRecursive = <T>(obj: T): T => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  // Handle arrays: Recursively sort object elements inside the array
  if (Array.isArray(obj)) {
    return obj.map(sortObjectRecursive) as T;
  }

  // Get keys, sort them, and reduce them back into a new ordered object
  return (
    Object.keys(obj)
      .sort()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .reduce((sorted: any, key: string) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        sorted[key] = sortObjectRecursive((obj as any)[key]);
        return sorted;
      }, {}) as T
  );
};

export const buildRepository = (
  seriesFile: string,
  setFiles: Record<string, string>,
  cardFiles: Record<string, string>,
  db: CompiledDb
) => {
  return `const loadSeries = async (): Promise<Array<any>> => {
    return (await import(${JSON.stringify(`./${seriesFile}`)}, {
      with: { type: 'json' } 
    })).default;
  };
  
  const loadSeriesById = async (id: string): Promise<any> => {
    const series = await import(${JSON.stringify(`./${seriesFile}`)}, {
      with: { type: 'json' } 
    });
    return series.default.find((item: any) => item.id === id);
  };
  
  const loadSetsBySeriesId = async (seriesId: string): Promise<Array<any>> => {
    switch (seriesId) {
      ${Object.entries(setFiles)
        .map(
          ([series, file]) => `
        case ${JSON.stringify(series)}:
          return (await import(${JSON.stringify(`./${file}`)}, {
            with: { type: 'json' } 
          })).default;
      `
        )
        .join('')}
    }
    
    throw new Error(\`Cannot load set for unknown series "\${seriesId}".\`);
  };
  
  const loadSetById = async (id: string): Promise<any> => {
    let sets;
  
    switch (id) {
      ${Object.entries(db.setsBySeries)
        .map(
          ([series, sets]) => `${sets
            .map(
              (set) => `
        case ${JSON.stringify(set.id)}:
      `
            )
            .join('')}
          sets = (await import(${JSON.stringify(`./${setFiles[series]}`)}, {
            with: { type: 'json' } 
          })).default;
          break;
      `
        )
        .join('')}
    }
    
    return sets?.find((item: any) => item.id === id);
  };
  
  const loadCardsBySetId = async (setId: string): Promise<Array<any>> => {
    switch (setId) {
      ${Object.entries(cardFiles)
        .map(
          ([set, file]) => `
        case ${JSON.stringify(set)}:
          return (await import(${JSON.stringify(`./${file}`)}, {
            with: { type: 'json' } 
          })).default;
      `
        )
        .join('')}
    }
    
    throw new Error(\`Cannot load cards for unknown set "\${setId}".\`);
  };
  
  const loadCardById = async (id: string): Promise<any> => {
    const lastDashIndex = id.lastIndexOf('-');
    
    if (lastDashIndex <= 1) {
      return;
    }
    
    const setId = id.substring(0, lastDashIndex);
    const cards = await loadCardsBySetId(setId);
    return cards?.find((item: any) => item.id === id);
  };
  
  export const repository = { loadSeries, loadSeriesById, loadSetsBySeriesId, loadSetById, loadCardsBySetId, loadCardById };`;
};

export const buildConstants = (db: CompiledDb) => {
  const seriesHash: Record<string, string> = {};
  const setsHash: Record<string, Record<string, string>> = {};

  Object.values(db.series).forEach((series) => {
    const key = toScreamingSnakeCase(series.name.en || series.id);

    if (key in seriesHash) {
      throw new Error(`Series with key "${key}" exists multiple times in data.`);
    }

    seriesHash[key] = series.id;
  });

  const seriesHashFlipped = Object.fromEntries(
    Object.entries(seriesHash).map(([key, value]) => [value, key])
  );

  Object.entries(db.setsBySeries).forEach(([series, sets]) => {
    const seriesKey = seriesHashFlipped[series];

    Object.values(sets).forEach((set) => {
      const setKey = toScreamingSnakeCase(set.name.en || set.id);

      setsHash[seriesKey] ||= {};

      if (setKey in setsHash[seriesKey]) {
        console.log(setsHash, sets);

        throw new Error(
          `Set with key "${setKey}" exists multiple times in data for series "${seriesKey}".`
        );
      }

      setsHash[seriesKey][setKey] = set.id;
    });
  });

  const tcgPlayerGroups: Record<number, Array<string>> = {};

  Object.values(db.setsBySeries).forEach((sets) => {
    sets.forEach((set) => {
      const tcgPlayerGroupId = set.thirdParty?.tcgplayer;

      if (tcgPlayerGroupId) {
        tcgPlayerGroups[tcgPlayerGroupId] ||= [];
        tcgPlayerGroups[tcgPlayerGroupId].push(set.id);
      }
    });
  });

  const flattenedCards = flattenCards(db.cardsBySet);
  const cardIllustrators = buildCardAttributeHash(flattenedCards, (card) => card.illustrator);
  const cardVariantTypes = buildCardAttributeHash(flattenedCards, (card) =>
    card.variants?.map((variant) => variant.type)
  );
  const cardVariantSubTypes = buildCardAttributeHash(flattenedCards, (card) =>
    card.variants?.map((variant) => variant.subtype)
  );
  const cardVariantStamps = buildCardAttributeHash(flattenedCards, (card) =>
    card.variants?.map((variant) => variant.stamp).flat()
  );
  const cardRarities = buildCardAttributeHash(flattenedCards, (card) => card.rarity);
  const cardCategories = buildCardAttributeHash(flattenedCards, (card) => card.category);
  const cardRegulationMarks = buildCardAttributeHash(flattenedCards, (card) => card.regulationMark);

  return (
    `export const COMMIT = ${JSON.stringify(db.commit, null, 2)};\n\n` +
    `export const VERSION = ${JSON.stringify(db.ref?.replace(/^tags\/v?/, '') || 'unknown', null, 2)};\n\n` +
    `export const SERIES = ${JSON.stringify(sortObjectRecursive(seriesHash), null, 2)} as const;\n\n` +
    `export const SERIES_IDS = ${JSON.stringify(Object.values(seriesHash).sort(), null, 2)} as const;\n\n` +
    `export const SETS = ${JSON.stringify(sortObjectRecursive(setsHash), null, 2)} as const;\n\n` +
    `export const SET_IDS = ${JSON.stringify(
      Object.values(setsHash)
        .map((sets) => Object.values(sets))
        .flat()
        .sort(),
      null,
      2
    )} as const;\n\n` +
    `export const CARD_ILLUSTRATORS = ${JSON.stringify(cardIllustrators, null, 2)} as const;\n\n` +
    `export const CARD_VARIANT_TYPES = ${JSON.stringify(cardVariantTypes, null, 2)} as const;\n\n` +
    `export const CARD_VARIANT_SUB_TYPES = ${JSON.stringify(cardVariantSubTypes, null, 2)} as const;\n\n` +
    `export const CARD_VARIANT_STAMPS = ${JSON.stringify(cardVariantStamps, null, 2)} as const;\n\n` +
    `export const CARD_RARITIES = ${JSON.stringify(cardRarities, null, 2)} as const;\n\n` +
    `export const CARD_CATEGORIES = ${JSON.stringify(cardCategories, null, 2)} as const;\n\n` +
    `export const CARD_REGULATION_MARKS = ${JSON.stringify(cardRegulationMarks, null, 2)} as const;\n\n` +
    `export const TCG_PLAYER_GROUPS = ${JSON.stringify(tcgPlayerGroups, null, 2)} as const;\n\n`
  );
};

export const removeOrphans = (db: CompiledDb): CompiledDb => {
  return {
    ...db,
    series: db.series.filter((item) => db.setsBySeries[item.id]),
    setsBySeries: Object.fromEntries(
      Object.entries(db.setsBySeries).map(([serie, sets]) => [
        serie,
        sets.filter((set) => db.cardsBySet[set.id]),
      ])
    ),
  };
};

export const writeDb = async (db: CompiledDb, outputDirectory: string): Promise<void> => {
  const setSeries: Record<string, string> = {};
  const seriesFile = 'series.json';
  const setFiles: Record<string, string> = {};
  const cardFiles: Record<string, string> = {};

  await fs.mkdir(outputDirectory, { recursive: true });
  await fs.writeFile(path.resolve(outputDirectory, seriesFile), JSON.stringify(db.series, null, 2));

  for (const series in db.setsBySeries) {
    db.setsBySeries[series].forEach((set) => {
      setSeries[set.id] = series;
    });
  }

  await fs.mkdir(path.resolve(outputDirectory, 'sets'), { recursive: true });
  for (const series in db.setsBySeries) {
    const fileName = path.resolve(outputDirectory, 'sets', `${series}.json`);
    await fs.writeFile(fileName, JSON.stringify(Object.values(db.setsBySeries[series]), null, 2));

    setFiles[series] = `sets/${series}.json`;
  }

  for (const set in db.cardsBySet) {
    const fileName = path.resolve(outputDirectory, 'cards', setSeries[set], `${set}.json`);
    await fs.mkdir(path.dirname(fileName), { recursive: true });
    await fs.writeFile(fileName, JSON.stringify(Object.values(db.cardsBySet[set]), null, 2));

    cardFiles[set] = `cards/${setSeries[set]}/${set}.json`;
  }

  await fs.writeFile(
    path.resolve(outputDirectory, 'repository.ts'),
    buildRepository(seriesFile, setFiles, cardFiles, db)
  );

  const constants = buildConstants(db);
  await fs.writeFile(path.resolve(outputDirectory, 'constants.ts'), constants);
};

export const compileDb = async (
  inputDirectory: string,
  outputDirectory: string,
  options?: CompileDbOptions
): Promise<void> => {
  const { commit, ref } = await getCheckedOutCommit(inputDirectory);
  const db: CompiledDb = {
    commit,
    ref,
    series: [],
    setsBySeries: {},
    cardsBySet: {},
  };
  const files = await glob('**/*.ts', {
    cwd: inputDirectory,
    absolute: true,
  });

  // Sets/set IDs by filename
  const seriesIds: Record<string, string> = {};
  const setIds: Record<string, string> = {};

  // extract card data
  for (const file of files) {
    const relativePath = path.relative(inputDirectory, file);
    const [seriesFile, setFile, cardNumber] = relativePath.replace(/\.ts$/i, '').split(path.sep);
    const extractedExport = extractFile(file);

    delete extractedExport.serie;
    delete extractedExport.set;

    if (seriesFile && !setFile && !cardNumber) {
      const series = RawSeriesSchema.parse(extractedExport);
      const seriesId = normalizeId(series.id);

      if (seriesId) {
        seriesIds[seriesFile] = seriesId;
        db.series.push(series);
      }
    } else if (seriesFile && setFile && !cardNumber) {
      const seriesId = seriesIds[seriesFile];

      if (!seriesId) {
        continue;
      }

      const set = RawSetSchema.parse({
        ...extractedExport,
        series: {
          id: seriesId,
        },
      });

      if (options?.useFileNameForSetId) {
        set.id = setFile;
      }

      const setId = normalizeId(set.id);

      if (setId) {
        setIds[`${seriesFile}/${setFile}`] = setId;
        db.setsBySeries[set.series.id] ||= [];
        db.setsBySeries[set.series.id].push(set);
      }
    } else if (seriesFile && setFile && cardNumber) {
      const seriesId = seriesIds[seriesFile];
      const setId = setIds[`${seriesFile}/${setFile}`];

      if (!seriesId || !setId) {
        continue;
      }

      const card = RawCardSchema.parse({
        ...extractedExport,
        series: {
          id: seriesId,
        },
        set: {
          id: setId,
        },
        cardNumber,
        id: `${setId}-${cardNumber}`,
      });

      db.cardsBySet[card.set.id] ||= [];
      db.cardsBySet[card.set.id].push(card);
    }
  }

  await writeDb(removeOrphans(db), outputDirectory);
};
