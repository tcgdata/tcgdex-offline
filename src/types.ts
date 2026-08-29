import { DATABASES } from './databases';
import {
  RawSeries,
  RawSet,
  RawCard,
  NormalizedSeries,
  NormalizedSet,
  NormalizedCard,
} from './schemas';

export type DatabaseName = keyof typeof DATABASES;

export type SeriesId<T extends DatabaseName> = (typeof DATABASES)[T]['SERIES_IDS'][number];

export type SetId<T extends DatabaseName> = (typeof DATABASES)[T]['SET_IDS'][number];

export type Series<T extends DatabaseName = DatabaseName> = NormalizedSeries & {
  id: SeriesId<T>;
};

export type Set<T extends DatabaseName = DatabaseName> = NormalizedSet & {
  id: SetId<T>;
  series: {
    id: SeriesId<T>;
  };
};

export type Card<T extends DatabaseName = DatabaseName> = NormalizedCard & {
  series: {
    id: SeriesId<T>;
  };
  set: {
    id: SeriesId<T>;
  };
};

export type CardRepository = {
  loadSeries: () => Promise<Array<RawSeries>>;
  loadSeriesById: (seriesId: string) => Promise<RawSeries | undefined>;
  loadSetsBySeriesId: (seriesId: string) => Promise<Array<RawSet>>;
  loadSetById: (setId: string) => Promise<RawSet | undefined>;
  loadCardsBySetId: (setId: string) => Promise<Array<RawCard>>;
  loadCardById: (cardId: string) => Promise<RawCard | undefined>;
};
