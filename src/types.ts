import {
  RawSeries,
  RawSet,
  RawCard,
  NormalizedSeries,
  NormalizedSet,
  NormalizedCard,
} from './schemas';

type ExtractId<T> = T extends ReadonlyArray<string> ? T[number] : T extends string ? T : string;

export type Series<TSeriesId extends ReadonlyArray<string> | string = string> = NormalizedSeries & {
  id: ExtractId<TSeriesId>;
};

export type Set<
  TSeriesId extends ReadonlyArray<string> | string = string,
  TSetId extends ReadonlyArray<string> | string = string,
> = NormalizedSet & {
  id: ExtractId<TSetId>;
  series: {
    id: ExtractId<TSeriesId>;
  };
};

export type Card<
  TSeriesId extends ReadonlyArray<string> | string = string,
  TSetId extends ReadonlyArray<string> | string = string,
> = NormalizedCard & {
  series: {
    id: ExtractId<TSeriesId>;
  };
  set: {
    id: ExtractId<TSetId>;
  };
};

export type DatabaseConfig<
  TSeriesIds extends ReadonlyArray<string> = ReadonlyArray<string>,
  TSetIds extends ReadonlyArray<string> = ReadonlyArray<string>,
> = {
  seriesIds: TSeriesIds;
  setIdsBySeriesId: Record<TSeriesIds[number], TSetIds>;
};

export type CardRepository = {
  loadSeries: () => Promise<Array<RawSeries>>;
  loadSetsBySeriesId: (seriesId: string) => Promise<Array<RawSet> | undefined>;
  loadCardsBySetId: (setId: string) => Promise<Array<RawCard> | undefined>;
};
