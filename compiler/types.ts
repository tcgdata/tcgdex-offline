import { RawCard, RawSeries, RawSet } from '../src/schemas';

export type UnnestArray<T> = T extends Array<infer U> ? U : T;

export type CompileDbOptions = {
  useFileNameForSetId?: boolean;
};

export type CompiledDb = {
  commit: string;
  ref: string | undefined;
  series: Array<RawSeries>;
  setsBySeries: Record<string, Array<RawSet>>;
  cardsBySet: Record<string, Array<RawCard>>;
};
