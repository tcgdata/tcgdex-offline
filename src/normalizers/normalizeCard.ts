import { RawCard, NormalizedCard } from '../schemas';
import { Language } from '../constants';

export const normalizeCard = (
  series: RawCard,
  { language }: { language: Language }
): NormalizedCard | undefined => {
  const {
    name,
    effect,
    abilities,
    attacks,
    description,
    item,
    evolveFrom,
    boosters: _,
    ...other
  } = series;

  if (!name[language]) {
    return;
  }

  const localizedItem = item && {
    name: item.name[language]!,
    effect: item.effect[language]!,
  };

  return {
    ...other,
    name: name[language]!,
    effect: effect?.[language],
    abilities: abilities
      ?.map((ability) => ({
        type: ability.type,
        name: ability.name[language]!,
        effect: ability.effect[language]!,
      }))
      .filter((ability) => ability.type || ability.name || ability.effect),
    attacks: attacks
      ?.map((attack) => ({
        cost: attack.cost,
        name: attack.name[language]!,
        effect: attack.effect?.[language],
        damage: attack.damage,
      }))
      .filter((attack) => attack.cost || attack.name || attack.effect || attack.damage),
    description: description?.[language],
    evolveFrom: evolveFrom?.[language],
    item: localizedItem?.name && localizedItem?.effect ? localizedItem : undefined,
  };
};
