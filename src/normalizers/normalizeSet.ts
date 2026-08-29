import { RawSet, NormalizedSet } from '../schemas';
import { Language } from '../constants';

export const normalizeSet = (
  set: RawSet,
  { language }: { language: Language }
): NormalizedSet | undefined => {
  const { name, releaseDate, abbreviations: _, boosters: __, tcgOnline: ___, ...other } = set;

  if (!name[language]) {
    return;
  }

  return {
    ...other,
    name: name[language]!,
    releaseDate: typeof releaseDate === 'string' ? releaseDate : releaseDate[language],
  };
};
