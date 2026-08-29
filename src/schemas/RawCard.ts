import { z, ZodTypeAny, ZodPreprocess } from 'zod';
import { LANGUAGES } from '../constants';

const removeUndefined = <T extends ZodTypeAny>(schema: T): ZodPreprocess<T> => {
  return z.preprocess((value) => {
    if (value === 'undefined') {
      return undefined;
    }

    return value;
  }, schema);
};

export const RawCardSchema = z
  .object({
    id: z.string(),
    name: z.partialRecord(z.enum(LANGUAGES), z.string()),
    illustrator: removeUndefined(z.string().optional()),
    rarity: z.string().optional(),
    category: z.string(),
    dexId: z.array(z.number()).optional(),
    hp: z.number().optional(),
    types: z.array(z.string()).optional(),
    evolveFrom: z.partialRecord(z.enum(LANGUAGES), z.string()).optional(),
    energyType: z.string().optional(),
    regulationMark: removeUndefined(z.string().optional()),
    trainerType: z.string().optional(),
    effect: z.partialRecord(z.enum(LANGUAGES), z.string()).optional(),
    stage: z.string().optional(),
    abilities: z
      .array(
        z
          .object({
            type: z.string().optional(),
            name: z.partialRecord(z.enum(LANGUAGES), z.string()),
            effect: z.partialRecord(z.enum(LANGUAGES), z.string()),
          })
          .strict()
      )
      .optional(),
    attacks: z
      .array(
        z
          .object({
            cost: z.array(z.string()).optional(),
            name: z.partialRecord(z.enum(LANGUAGES), z.string()),
            effect: z.partialRecord(z.enum(LANGUAGES), z.string()).optional(),
            damage: z.union([z.number(), z.string()]).optional(),
          })
          .strict()
      )
      .optional(),
    weaknesses: z
      .array(
        z
          .object({
            type: z.string(),
            value: z.string().optional(),
          })
          .strict()
      )
      .optional(),
    resistances: z
      .array(
        z
          .object({
            type: z.string(),
            value: z.string().optional(),
          })
          .strict()
      )
      .optional(),
    retreat: z.number().optional(),
    variants: z.preprocess(
      (value) => {
        if (typeof value !== 'object' || !value || value instanceof Array) {
          return value;
        }

        const resolvedValue: Array<{ type: string }> = [];
        const data = z
          .object({
            normal: z.boolean(),
            reverse: z.boolean(),
            holo: z.boolean(),
            // None of the cards have firstEdition set to true, fail if it is true, creates a conflict in
            // understanding the foiling if the first edition.
            firstEdition: z.literal(false),
          })
          .strict()
          .parse(value);

        Object.keys(data).forEach((type) => {
          if (data[type as keyof typeof data]) {
            resolvedValue.push({ type });
          }
        });

        return resolvedValue;
      },
      z
        .array(
          z.object({
            type: z.string(),
            subtype: z.string().optional(),
            stamp: z.array(z.string()).optional(),
            thirdParty: z
              .object({
                cardmarket: z.number().optional(),
                tcgplayer: z.number().optional(),
                cardtrader: z.number().optional(),
              })
              .strict()
              .optional(),
          })
        )
        .optional()
    ),
    description: z.partialRecord(z.enum(LANGUAGES), z.string()).optional(),
    series: z.object({
      id: z.string(),
    }),
    set: z.object({
      id: z.string(),
    }),
    suffix: z.string().optional(),
    thirdParty: z
      .object({
        cardmarket: z.number().optional(),
        tcgplayer: z.number().optional(),
        cardtrader: z.number().optional(),
      })
      .strict()
      .optional(),
    boosters: z.array(z.string()).optional(),
    item: z
      .object({
        name: z.partialRecord(z.enum(LANGUAGES), z.string()),
        effect: z.partialRecord(z.enum(LANGUAGES), z.string()),
      })
      .strict()
      .optional(),
    cardNumber: z.string(),
  })
  .strict();

export type RawCard = z.infer<typeof RawCardSchema>;
