import * as InternationalDbConstants from './db/international/constants';
import * as AsiaDbConstants from './db/asia/constants';

export const DATABASES = {
  INTERNATIONAL: InternationalDbConstants,
  ASIA: AsiaDbConstants,
} as const;
