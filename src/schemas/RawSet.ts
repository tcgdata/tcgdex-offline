import { z } from 'zod';
import { ABBREVIATION_LANGUAGES, LANGUAGES } from '../constants';

export const RawSetSchema = z
  .object({
    id: z.string(),
    name: z.partialRecord(z.enum(LANGUAGES), z.string()),
    tcgOnline: z.string().optional(),
    cardCount: z
      .object({
        official: z.number(),
      })
      .strict(),
    releaseDate: z.union([z.iso.date(), z.partialRecord(z.enum(LANGUAGES), z.iso.date())]),
    thirdParty: z
      .object({
        cardmarket: z.number().optional(),
        tcgplayer: z.number().optional(),
      })
      .strict()
      .optional(),
    series: z.object({
      id: z.string(),
    }),
    abbreviations: z.partialRecord(z.enum(ABBREVIATION_LANGUAGES), z.string()).optional(),
    boosters: z
      .array(z.string())
      .or(
        z.record(
          z.string(),
          z.object({
            name: z.partialRecord(z.enum(LANGUAGES), z.string()),
          })
        )
      )
      .optional(),
  })
  .strict();

export type RawSet = z.infer<typeof RawSetSchema>;
