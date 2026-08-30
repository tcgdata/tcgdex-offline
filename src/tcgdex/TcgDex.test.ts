/* eslint-disable vitest/prefer-strict-equal */
import { Mocked } from 'vitest';
import {
  createTcgDex as createInternationalTcgDex,
  SETS,
  SERIES,
  TCG_PLAYER_GROUPS,
} from '../db/international';
import { createTcgDex as createAsiaTcgDex } from '../db/asia';
import { IMAGE_EXTENSION, IMAGE_QUALITY, LANGUAGES } from '../constants';
import { NormalizedCardSchema, NormalizedSeriesSchema, NormalizedSetSchema } from '../schemas';
import { TcgDex } from './TcgDex';
import { CardRepository } from '../types';
import { createMockRawCard, createMockRawSeries, createMockRawSet } from './TcgDex.mocks';
import { faker } from '@faker-js/faker';

describe('TcgDex', () => {
  const MOCK_SERIES = { ONE: 'mock-series-id-1', TWO: 'mock-series-id-2' } as const;
  const MOCK_SETS = { ONE: 'mock-set-id-1', TWO: 'mock-set-id-2' } as const;

  const createCustomTcgDex = (): { tcgDex: TcgDex; repository: Mocked<CardRepository> } => {
    const seriesIds = [MOCK_SERIES.ONE, MOCK_SERIES.TWO] as const;
    const setIdsBySeriesId = {
      [MOCK_SERIES.ONE]: [MOCK_SETS.ONE],
      [MOCK_SERIES.TWO]: [MOCK_SETS.TWO],
    } as const;
    const repository: Mocked<CardRepository> = {
      loadSeries: vi.fn(),
      loadSetsBySeriesId: vi.fn(),
      loadCardsBySetId: vi.fn(),
    };

    const tcgDex = new TcgDex({
      language: LANGUAGES.ENGLISH,
      config: {
        seriesIds,
        setIdsBySeriesId,
      },
      repository,
    });

    return { tcgDex, repository };
  };

  describe('getSeries', () => {
    test('Returns array of series objects', async () => {
      const tcgDex = createInternationalTcgDex({ language: LANGUAGES.ENGLISH });
      const series = await tcgDex.getSeries();

      expect(series).toEqual(
        expect.arrayContaining([
          {
            id: 'swsh',
            name: 'Sword & Shield',
          },
        ])
      );
    });

    test('Returns an empty array if no series exist for the language requested', async () => {
      const tcgDex = createInternationalTcgDex({ language: LANGUAGES.INDONESIAN });

      expect(await tcgDex.getSeries()).toEqual([]);
    });

    test('Returns data queried from repository', async () => {
      const { tcgDex, repository } = createCustomTcgDex();
      const mockSeries = createMockRawSeries();

      repository.loadSeries.mockResolvedValue([mockSeries]);

      expect(await tcgDex.getSeries()).toEqual([
        {
          id: mockSeries.id,
          name: mockSeries.name.en,
        },
      ]);
      expect(repository.loadSeries).toHaveBeenCalled();
    });
  });

  describe('getSeriesById', () => {
    test('Returns a single series object', async () => {
      const tcgDex = createInternationalTcgDex({ language: LANGUAGES.ENGLISH });
      const series = await tcgDex.getSeriesById(SERIES.SUN_AND_MOON);

      expect(series).toEqual({
        id: 'sm',
        name: 'Sun & Moon',
      });
    });

    test('Throws an error if a series exists but not for the language requested', async () => {
      const tcgDex = createInternationalTcgDex({ language: LANGUAGES.JAPANESE });

      await expect(tcgDex.getSeriesById('hgss')).rejects.toThrow(
        'Series with ID "hgss" does not exist for language "ja".'
      );
    });

    test('Throws an error if a non-existent series ID is provided', async () => {
      const tcgDex = createInternationalTcgDex({ language: LANGUAGES.ENGLISH });

      // @ts-expect-error Testing bad input
      await expect(tcgDex.getSeriesById('unknown')).rejects.toThrow(
        'Series with ID "unknown" does not exist for language "en".'
      );
    });

    test('Returns data queried from repository', async () => {
      const { tcgDex, repository } = createCustomTcgDex();
      const mockSeries = createMockRawSeries();

      repository.loadSeries.mockResolvedValue([mockSeries]);

      expect(await tcgDex.getSeriesById(mockSeries.id)).toEqual({
        id: mockSeries.id,
        name: mockSeries.name.en,
      });
      expect(repository.loadSeries).toHaveBeenCalled();
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

    test('Returns an empty array if a set exists but not for the language requested', async () => {
      const tcgDex = createInternationalTcgDex({ language: LANGUAGES.JAPANESE });

      expect(await tcgDex.getSetsBySeriesId('base')).toEqual([]);
    });

    test('Throws an error if a non-existent series ID is provided', async () => {
      const tcgDex = createInternationalTcgDex({ language: LANGUAGES.ENGLISH });

      // @ts-expect-error Testing bad input
      await expect(tcgDex.getSetsBySeriesId('unknown')).rejects.toThrow(
        'Series with ID "unknown" does not exist for language "en".'
      );
    });

    test('Returns data queried from repository', async () => {
      const { tcgDex, repository } = createCustomTcgDex();
      const mockSet = createMockRawSet({ id: MOCK_SERIES.ONE });

      repository.loadSetsBySeriesId.mockResolvedValue([mockSet]);

      expect(await tcgDex.getSetsBySeriesId(MOCK_SERIES.ONE)).toEqual([
        {
          cardCount: mockSet.cardCount,
          id: mockSet.id,
          name: mockSet.name.en,
          releaseDate: mockSet.releaseDate,
          series: mockSet.series,
          thirdParty: mockSet.thirdParty,
        },
      ]);
      expect(repository.loadSetsBySeriesId).toHaveBeenCalledWith(MOCK_SERIES.ONE);
    });
  });

  describe('getSetById', () => {
    test('Returns a single set object', async () => {
      const tcgDex = createInternationalTcgDex({ language: LANGUAGES.ENGLISH });
      const series = await tcgDex.getSetById(SETS.BASE.BASE_SET);

      expect(series).toEqual({
        cardCount: {
          official: 102,
        },
        id: 'base1',
        name: 'Base Set',
        releaseDate: '1999-01-09',
        series: {
          id: 'base',
        },
        thirdParty: {
          cardmarket: 1523,
          tcgplayer: 604,
        },
      });
    });

    test('Throws an error if a set exists but not for the language requested', async () => {
      const tcgDex = createInternationalTcgDex({ language: LANGUAGES.JAPANESE });

      await expect(tcgDex.getSetById('base1')).rejects.toThrow(
        'Set with ID "base1" does not exist for language "ja".'
      );
    });

    test('Throws an error if a non-existent set ID is provided', async () => {
      const tcgDex = createInternationalTcgDex({ language: LANGUAGES.ENGLISH });

      // @ts-expect-error Testing bad input
      await expect(tcgDex.getSetById('unknown')).rejects.toThrow(
        'Set with ID "unknown" does not exist for language "en".'
      );
    });

    test('Returns data queried from repository', async () => {
      const { tcgDex, repository } = createCustomTcgDex();
      const mockSet = createMockRawSet({ id: MOCK_SETS.TWO });

      repository.loadSetsBySeriesId.mockResolvedValue([mockSet]);

      expect(await tcgDex.getSetById(MOCK_SETS.TWO)).toEqual({
        cardCount: mockSet.cardCount,
        id: mockSet.id,
        name: mockSet.name.en,
        releaseDate: mockSet.releaseDate,
        series: mockSet.series,
        thirdParty: mockSet.thirdParty,
      });
      expect(repository.loadSetsBySeriesId).toHaveBeenCalledWith(MOCK_SERIES.TWO);
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

    test('Returns an empty array if a set exists but not for the language requested', async () => {
      const tcgDex = createInternationalTcgDex({ language: LANGUAGES.JAPANESE });

      expect(await tcgDex.getCardsBySetId('base1')).toEqual([]);
    });

    test('Throws an error if a non-existent set ID is provided', async () => {
      const tcgDex = createInternationalTcgDex({ language: LANGUAGES.ENGLISH });

      // @ts-expect-error Testing bad input
      await expect(tcgDex.getCardsBySetId('unknown')).rejects.toThrow(
        'Set with ID "unknown" does not exist for language "en".'
      );
    });

    test('Returns data queried from repository', async () => {
      const { tcgDex, repository } = createCustomTcgDex();
      const mockCard = createMockRawCard();

      repository.loadCardsBySetId.mockResolvedValue([mockCard]);

      expect(await tcgDex.getCardsBySetId(MOCK_SETS.ONE)).toEqual([
        {
          cardNumber: mockCard.cardNumber,
          category: mockCard.category,
          energyType: mockCard.energyType,
          id: mockCard.id,
          illustrator: mockCard.illustrator,
          name: mockCard.name.en,
          rarity: mockCard.rarity,
          series: mockCard.series,
          set: mockCard.set,
          stage: mockCard.stage,
          variants: [
            {
              subtype: mockCard.variants?.[0].subtype,
              thirdParty: mockCard.variants?.[0].thirdParty,
              type: mockCard.variants?.[0].type,
            },
          ],
        },
      ]);
      expect(repository.loadCardsBySetId).toHaveBeenCalledWith(MOCK_SETS.ONE);
    });
  });

  describe('getCardById', async () => {
    test('Returns a single card object', async () => {
      const tcgDex = createInternationalTcgDex({ language: LANGUAGES.ENGLISH });
      const card = await tcgDex.getCardById('base1-4');

      expect(card).toEqual(
        expect.objectContaining({
          id: 'base1-4',
          name: 'Charizard',
        })
      );
    });

    test('Throws an error if a card exists but not for the language requested', async () => {
      const tcgDex = createInternationalTcgDex({ language: LANGUAGES.JAPANESE });

      await expect(tcgDex.getCardById('swsh7-215')).rejects.toThrow(
        'Card with ID "swsh7-215" does not exist for language "ja".'
      );
    });

    test('Throws an error if a non-existent card ID is provided', async () => {
      const tcgDex = createInternationalTcgDex({ language: LANGUAGES.ENGLISH });

      await expect(tcgDex.getCardById('unknown')).rejects.toThrow(
        'Card with ID "unknown" does not exist for language "en".'
      );
    });

    test('Returns data queried from repository', async () => {
      const { tcgDex, repository } = createCustomTcgDex();
      const cardId = `${MOCK_SETS.ONE}-${faker.number.int()}`;
      const mockCard = createMockRawCard({ id: cardId });

      repository.loadCardsBySetId.mockResolvedValue([mockCard]);

      expect(await tcgDex.getCardById(cardId)).toEqual({
        cardNumber: mockCard.cardNumber,
        category: mockCard.category,
        energyType: mockCard.energyType,
        id: mockCard.id,
        illustrator: mockCard.illustrator,
        name: mockCard.name.en,
        rarity: mockCard.rarity,
        series: mockCard.series,
        set: mockCard.set,
        stage: mockCard.stage,
        variants: [
          {
            subtype: mockCard.variants?.[0].subtype,
            thirdParty: mockCard.variants?.[0].thirdParty,
            type: mockCard.variants?.[0].type,
          },
        ],
      });
      expect(repository.loadCardsBySetId).toHaveBeenCalledWith(MOCK_SETS.ONE);
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
      { timeout: 30_000 },
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
