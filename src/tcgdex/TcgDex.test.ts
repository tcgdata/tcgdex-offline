/* eslint-disable vitest/prefer-strict-equal */
import { createAsiaTcgDex, createInternationalTcgDex } from '../utils';
import { SETS, SERIES, TCG_PLAYER_GROUPS } from '../db/international/constants';
import { IMAGE_EXTENSION, IMAGE_QUALITY, LANGUAGES } from '../constants';
import { NormalizedCardSchema, NormalizedSeriesSchema, NormalizedSetSchema } from '../schemas';

describe('index', () => {
  describe('getSeries', () => {
    test('Returns array of series objects', async () => {
      const tcgDex = createInternationalTcgDex({ language: LANGUAGES.ENGLISH });
      const series = await tcgDex.getSeries();

      expect(series).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: 'swsh',
            name: 'Sword & Shield',
          }),
        ])
      );
    });
  });

  describe('getSetsBySeriesId', () => {
    test('Returns array of set objects', async () => {
      const tcgDex = createInternationalTcgDex({ language: LANGUAGES.ENGLISH });
      const sets = await tcgDex.getSetsBySeriesId(SERIES.SWORD_AND_SHIELD);

      expect(sets).toEqual(
        expect.arrayContaining([
          {
            cardCount: {
              official: 70,
            },
            id: 'swsh12.5gg',
            name: 'Crown Zenith Galarian Gallery',
            releaseDate: '2023-01-20',
            series: {
              id: 'swsh',
            },
          },
        ])
      );
    });
  });

  describe('getCardsBySetId', () => {
    test('Returns array of card objects', async () => {
      const tcgDex = createInternationalTcgDex({ language: LANGUAGES.ENGLISH });
      const cards = await tcgDex.getCardsBySetId(
        SETS.SWORD_AND_SHIELD.CROWN_ZENITH_GALARIAN_GALLERY
      );

      expect(cards).toEqual(
        expect.arrayContaining([
          {
            attacks: [
              {
                cost: ['Psychic', 'Colorless'],
                damage: '90×',
                effect:
                  'Discard up to 3 Psychic Energy from your Pokémon. This attack does 90 damage for each card you discarded in this way.',
                name: 'Psy Purge',
              },
              {
                cost: ['Psychic', 'Colorless'],
                effect:
                  "This attack does 120 damage to each of your opponent's Pokémon V. This damage isn't affected by Weakness or Resistance. (You can't use more than 1 VSTAR Power in a game.)",
                name: 'Star Raid',
              },
            ],
            cardNumber: 'GG44',
            category: 'Pokemon',
            dexId: [150],
            evolveFrom: 'Mewtwo V',
            hp: 280,
            id: 'swsh12.5gg-GG44',
            illustrator: 'GOSSAN',
            name: 'Mewtwo VSTAR',
            rarity: 'Ultra Rare',
            regulationMark: 'F',
            resistances: [
              {
                type: 'Fighting',
                value: '-30',
              },
            ],
            retreat: 2,
            series: {
              id: 'swsh',
            },
            set: {
              id: 'swsh12.5gg',
            },
            stage: 'VSTAR',
            suffix: 'V',
            types: ['Psychic'],
            variants: [
              {
                thirdParty: {
                  cardmarket: 691924,
                  tcgplayer: 477057,
                },
                type: 'holo',
              },
            ],
            weaknesses: [
              {
                type: 'Darkness',
                value: '×2',
              },
            ],
          },
        ])
      );
    });

    test('Returns cards queried by TCGPlayer group ID', async () => {
      const CROWN_ZENITH_TCGPLAYER_GROUP_ID = '17688';
      const tcgDex = createInternationalTcgDex({ language: LANGUAGES.ENGLISH });
      const cards = await Promise.all(
        TCG_PLAYER_GROUPS[CROWN_ZENITH_TCGPLAYER_GROUP_ID].map((set) => tcgDex.getCardsBySetId(set))
      );

      expect(cards.flat()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: 'Pikachu',
            cardNumber: '160',
          }),
        ])
      );
    });
  });

  describe('getCardImageUrl', () => {
    test('Returns tcgdex image URL', async () => {
      const tcgDex = createInternationalTcgDex({ language: LANGUAGES.ENGLISH });
      const card = await tcgDex.getCardById('swsh7-215');

      expect(tcgDex.getCardImageUrl(card, IMAGE_QUALITY.HIGH, IMAGE_EXTENSION.WEBP)).toBe(
        'https://assets.tcgdex.net/en/swsh/swsh7/215/high.webp'
      );
    });
  });

  describe('getSetLogoImageUrl', () => {
    test('Returns tcgdex image URL', async () => {
      const tcgDex = createInternationalTcgDex({ language: LANGUAGES.ENGLISH });
      const set = await tcgDex.getSetById(SETS.SWORD_AND_SHIELD.EVOLVING_SKIES);

      expect(tcgDex.getSetLogoImageUrl(set, IMAGE_EXTENSION.WEBP)).toBe(
        'https://assets.tcgdex.net/en/swsh/swsh7/logo.webp'
      );
    });
  });

  describe('Validate full data set', () => {
    test.each(Object.values(LANGUAGES))(
      'International data can be queried and is valid - %s',
      { timeout: 15_000 },
      async (language) => {
        const tcgDex = createInternationalTcgDex({ language });
        const actual = {
          cards: 0,
          sets: 0,
          series: 0,
        };

        for (const series of await tcgDex.getSeries()) {
          for (const set of await tcgDex.getSetsBySeriesId(series.id)) {
            for (const card of await tcgDex.getCardsBySetId(set.id)) {
              expect(card).toEqual(expect.schemaMatching(NormalizedCardSchema));
              actual.cards++;
            }

            expect(set).toEqual(expect.schemaMatching(NormalizedSetSchema));
            actual.sets++;
          }

          expect(series).toEqual(expect.schemaMatching(NormalizedSeriesSchema));
          actual.series++;
        }

        expect(actual).toMatchSnapshot();
      }
    );

    test.each(Object.values(LANGUAGES))(
      'Asian data can be queried and is valid - %s',
      { timeout: 15_000 },
      async (language) => {
        const tcgDex = createAsiaTcgDex({ language });
        const actual = {
          cards: 0,
          sets: 0,
          series: 0,
        };

        for (const series of await tcgDex.getSeries()) {
          for (const set of await tcgDex.getSetsBySeriesId(series.id)) {
            for (const card of await tcgDex.getCardsBySetId(set.id)) {
              expect(card).toEqual(expect.schemaMatching(NormalizedCardSchema));
              actual.cards++;
            }

            expect(set).toEqual(expect.schemaMatching(NormalizedSetSchema));
            actual.sets++;
          }

          expect(series).toEqual(expect.schemaMatching(NormalizedSeriesSchema));
          actual.series++;
        }

        expect(actual).toMatchSnapshot();
      }
    );
  });
});
