import { Language } from '../constants';
import { CardRepository } from '../types';

export type TcgDexProps = {
  language: Language;
};

export type ResolvedTxgDexProps = TcgDexProps & {
  repository: CardRepository;
};
