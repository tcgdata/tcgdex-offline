import { TcgDex, TcgDexProps } from '../tcgdex';
import { repository as internationalRepository } from '../db/international/repository';

export const createInternationalTcgDex = (props: TcgDexProps): TcgDex<'INTERNATIONAL'> => {
  return new TcgDex({ ...props, repository: internationalRepository });
};
