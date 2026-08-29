import { RawSeries, NormalizedSeries } from '../schemas';
import { Language } from '../constants';

export const normalizeSeries = (
  series: RawSeries,
  props: { language: Language }
): NormalizedSeries | undefined => {
  const { name, energies: _, ...other } = series;

  if (!name[props.language]) {
    return;
  }

  return {
    ...other,
    name: name[props.language]!,
  };
};
