import { repository as defaultRepository } from './repository';
import { SERIES_IDS, SET_IDS_BY_SERIES_ID } from './constants';
import { TcgDex, TcgDexProps } from '../../tcgdex';
import { CardRepository } from '../../types';

export {
  // Version details
  COMMIT,
  VERSION,

  // Identifiers
  SERIES_IDS,
  SET_IDS_BY_SERIES_ID,
  SET_IDS,
  SETS,
  SERIES,
  TCG_PLAYER_GROUPS,

  // Card attributes
  CARD_CATEGORIES,
  CARD_ILLUSTRATORS,
  CARD_RARITIES,
  CARD_REGULATION_MARKS,
  CARD_VARIANT_STAMPS,
  CARD_VARIANT_TYPES,
  CARD_VARIANT_SUB_TYPES,
} from './constants';

type SeriesIds = typeof SERIES_IDS;
type SetIds = (typeof SET_IDS_BY_SERIES_ID)[keyof typeof SET_IDS_BY_SERIES_ID];

export type SeriesId = SeriesIds[number];
export type SetId = SetIds[number];

export const createTcgDex = (
  props: TcgDexProps,
  repository?: CardRepository
): TcgDex<SeriesIds, SetIds> => {
  return new TcgDex({
    ...props,
    repository: defaultRepository || repository,
    config: {
      seriesIds: SERIES_IDS,
      setIdsBySeriesId: SET_IDS_BY_SERIES_ID,
    },
  });
};
