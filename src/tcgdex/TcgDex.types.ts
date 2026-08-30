import { Language } from '../constants';
import { CardRepository, DatabaseConfig } from '../types';

export type TcgDexProps = {
  language: Language;
};

export type ResolvedTxgDexProps = TcgDexProps & {
  config: DatabaseConfig;
  repository: CardRepository;
};
