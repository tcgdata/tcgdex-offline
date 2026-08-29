import { z } from 'zod';
import { RawCardSchema } from './RawCard';

export const NormalizedCardSchema = RawCardSchema.pick({
  id: true,
  illustrator: true,
  rarity: true,
  category: true,
  dexId: true,
  hp: true,
  types: true,
  energyType: true,
  regulationMark: true,
  trainerType: true,
  effect: true,
  stage: true,
  abilities: true,
  attacks: true,
  weaknesses: true,
  resistances: true,
  retreat: true,
  variants: true,
  series: true,
  set: true,
  suffix: true,
  thirdParty: true,
  item: true,
  cardNumber: true,
})
  .extend({
    name: z.string(),
    effect: z.string().optional(),
    abilities: z
      .array(
        z
          .object({
            type: z.string().optional(),
            name: z.string().optional(),
            effect: z.string().optional(),
          })
          .strict()
      )
      .optional(),
    attacks: z
      .array(
        z
          .object({
            cost: z.array(z.string()).optional(),
            name: z.string().optional(),
            effect: z.string().optional(),
            damage: z.union([z.number(), z.string()]).optional(),
          })
          .strict()
      )
      .optional(),
    description: z.string().optional(),
    item: z
      .object({
        name: z.string(),
        effect: z.string(),
      })
      .strict()
      .optional(),
    evolveFrom: z.string().optional(),
  })
  .strict();

export type NormalizedCard = z.infer<typeof NormalizedCardSchema>;
