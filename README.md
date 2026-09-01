# tcgdex-offline

![NPM Version](https://img.shields.io/npm/v/%40tcgdata%2Ftcgdex-offline)
![CI](https://github.com/tcgdata/tcgdex-offline/actions/workflows/ci.yml/badge.svg)

Provides functions for querying and iterating through series, set and card data maintained in
https://github.com/tcgdex/cards-database.

All data is bundled with the package code to avoid needing to query from the [tcgdex API](https://tcgdex.dev/).

Exposed data structures are very similar to those returned from the tcgdex API but is not 100% compatible.
Notably this repo will likely never expose TCGplayer or CardMarket data due to being highly dynamic.

## Installation

```
npm i @tcgdata/tcgdex-offline
```

## Usage

```typescript
import { IMAGE_QUALITY, IMAGE_EXTENSION, LANGUAGES } from '@tcgdata/tcgdex-offline';
import { createTcgDex, SERIES, SETS } from '@tcgdata/tcgdex-offline/db/international';

const tcgDex = createTcgDex({
  // English language strings will be returned.
  // Data that has no English translation is not returned.
  // Data that is partially translated may still be returned but will the non-translated data will be missing.
  language: LANGUAGES.ENGLISH,
});

// Query all series, or a specific series by ID
// { id: 'swsh', name: 'Sword & Shield' }
const series = await tcgDex.getSeries();
const serie = await tcgDex.getSeriesById(SERIES.SWORD_AND_SHIELD);

// Query sets by series or set ID
// {
//   id: 'swsh12.5gg',
//   cardCount: { official: 70 },
//   series: { id: 'swsh' },
//   name: 'Crown Zenith Galarian Gallery',
//   releaseDate: '2023-01-20'
// }
const sets = await tcgDex.getSetsBySeriesId(SERIES.SWORD_AND_SHIELD);
const set = await tcgDex.getSetById(SETS.SWORD_AND_SHIELD.CROWN_ZENITH_GALARIAN_GALLERY);

// Query cards by set or card ID
// {
//   id: 'swsh12.5gg-GG44',
//   illustrator: 'GOSSAN',
//   rarity: 'Ultra Rare',
//   category: 'Pokemon',
//   dexId: [ 150 ],
//   hp: 280,
//   types: [ 'Psychic' ],
//   regulationMark: 'F',
//   stage: 'VSTAR',
//   weaknesses: [ { type: 'Darkness', value: '×2' } ],
//   resistances: [ { type: 'Fighting', value: '-30' } ],
//   retreat: 2,
//   variants: [
//     {
//       type: 'holo',
//       thirdParty: { cardmarket: 691924, tcgplayer: 477057 }
//     }
//   ],
//   series: { id: 'swsh' },
//   set: { id: 'swsh12.5gg' },
//   suffix: 'V',
//   cardNumber: 'GG44',
//   name: 'Mewtwo VSTAR',
//   attacks: [
//     {
//       cost: [ 'Psychic', 'Colorless' ],
//       name: 'Psy Purge',
//       effect: 'Discard up to 3 Psychic Energy from your Pokémon. This attack does 90 damage for each card you discarded in this way.',
//       damage: '90×'
//     },
//     {
//       cost: [ 'Psychic', 'Colorless' ],
//       name: 'Star Raid',
//       effect: "This attack does 120 damage to each of your opponent's Pokémon V. This damage isn't affected by Weakness or Resistance. (You can't use more than 1 VSTAR Power in a game.)",
//     }
//   ],
//   evolveFrom: 'Mewtwo V',
// }
const cards = await tcgDex.getCardsBySetId(SETS.SWORD_AND_SHIELD.CROWN_ZENITH_GALARIAN_GALLERY);
const card = await tcgDex.getCardById('swsh12.5gg-GG44');

// Build card image URL
// https://assets.tcgdex.net/en/swsh/swsh12.5gg/GG44/high.webp
const cardImageUrl = tcgDex.getCardImageUrl(
  await tcgDex.getCardById('swsh12.5gg-GG44'),
  IMAGE_QUALITY.HIGH,
  IMAGE_EXTENSION.WEBP
);

// Build set logo URL
// https://assets.tcgdex.net/en/swsh/swsh12.5gg/logo.webp
const setLogoImageUrl = tcgDex.getSetLogoImageUrl(
  await tcgDex.getSetById(SETS.SWORD_AND_SHIELD.CROWN_ZENITH_GALARIAN_GALLERY),
  IMAGE_EXTENSION.WEBP
);
```
