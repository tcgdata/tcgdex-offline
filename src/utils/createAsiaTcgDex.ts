import { TcgDex, TcgDexProps } from '../tcgdex';
import { repository as asiaRepository } from '../db/asia/repository';

export const createAsiaTcgDex = (props: TcgDexProps): TcgDex<'ASIA'> => {
  return new TcgDex({ ...props, repository: asiaRepository });
};
