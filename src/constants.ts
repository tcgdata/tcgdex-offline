export const LANGUAGES = {
  ENGLISH: 'en',
  FRENCH: 'fr',
  ITALIAN: 'it',
  SPANISH: 'es',
  DUTCH: 'de',
  RUSSIAN: 'ru',
  PORTUGUESE: 'pt',
  MEXICAN_SPANISH: 'es-mx',
  JAPANESE: 'ja',
  KOREAN: 'ko',
  BRAZILIAN_PORTUGUESE: 'pt-br',
  POLISH: 'pl',
  NETHERLANDS_DUTCH: 'nl',
  SIMPLIFIED_CHINESE: 'zh-cn',
  TRADITIONAL_CHINESE: 'zh-tw',
  INDONESIAN: 'id',
  THAI: 'th',
} as const;

export type Language = (typeof LANGUAGES)[keyof typeof LANGUAGES];

export const INTERNATIONAL_LANGUAGES = [
  LANGUAGES.ENGLISH,
  LANGUAGES.FRENCH,
  LANGUAGES.ITALIAN,
  LANGUAGES.SPANISH,
  LANGUAGES.DUTCH,
  LANGUAGES.RUSSIAN,
  LANGUAGES.PORTUGUESE,
  LANGUAGES.MEXICAN_SPANISH,
  LANGUAGES.BRAZILIAN_PORTUGUESE,
  LANGUAGES.POLISH,
  LANGUAGES.NETHERLANDS_DUTCH,
] as const;

export const ASIAN_LANGUAGES = [
  LANGUAGES.JAPANESE,
  LANGUAGES.KOREAN,
  LANGUAGES.SIMPLIFIED_CHINESE,
  LANGUAGES.TRADITIONAL_CHINESE,
  LANGUAGES.INDONESIAN,
  LANGUAGES.THAI,
] as const;

export const ABBREVIATION_LANGUAGES = {
  OFFICIAL: 'official',
  ...LANGUAGES,
} as const;

export type AbbreviationLanguage =
  (typeof ABBREVIATION_LANGUAGES)[keyof typeof ABBREVIATION_LANGUAGES];

export const IMAGE_QUALITY = {
  HIGH: 'high',
  LOW: 'low',
};

export type ImageQuality = (typeof IMAGE_QUALITY)[keyof typeof IMAGE_QUALITY];

export const IMAGE_EXTENSION = {
  PNG: 'png',
  WEBP: 'webp',
  JPG: 'jpg',
};

export type ImageExtension = (typeof IMAGE_EXTENSION)[keyof typeof IMAGE_EXTENSION];
