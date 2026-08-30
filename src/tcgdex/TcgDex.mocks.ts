import { faker } from '@faker-js/faker';
import { RawCard, RawSeries, RawSet } from '../schemas';

export const createMockRawSeries = (props: Partial<RawSeries> = {}): RawSeries => {
  return {
    id: faker.string.uuid(),
    name: {
      en: faker.lorem.words(),
    },
    energies: [faker.lorem.words()],
    ...props,
  };
};

export const createMockRawSet = (props: Partial<RawSet> = {}): RawSet => {
  return {
    id: faker.string.uuid(),
    name: {
      en: faker.lorem.words(),
    },
    tcgOnline: faker.lorem.word(),
    cardCount: {
      official: faker.number.int(),
    },
    releaseDate: faker.date.past().toISOString().split('T')[0],
    thirdParty: {
      cardmarket: faker.number.int(),
    },
    series: {
      id: faker.string.uuid(),
    },
    ...props,
  };
};

export const createMockRawCard = (props: Partial<RawCard> = {}): RawCard => {
  const cardNumber = props.cardNumber || `${faker.number.int()}`;

  return {
    id: `${faker.string.uuid()}-${cardNumber}`,
    name: {
      en: faker.lorem.words(),
    },
    illustrator: faker.person.fullName(),
    rarity: faker.lorem.word(),
    category: faker.lorem.word(),
    energyType: faker.lorem.word(),
    stage: faker.lorem.word(),
    variants: [
      {
        type: faker.lorem.word(),
        subtype: faker.lorem.word(),
        thirdParty: {
          cardmarket: faker.number.int(),
          tcgplayer: faker.number.int(),
        },
      },
    ],
    series: {
      id: faker.string.uuid(),
    },
    set: {
      id: faker.string.uuid(),
    },
    cardNumber,
    ...props,
  };
};
