import { z } from 'zod';
import { RawSetSchema } from './RawSet';

export const NormalizedSetSchema = RawSetSchema.pick({
  id: true,
  cardCount: true,
  thirdParty: true,
  series: true,
})
  .extend({
    name: z.string(),
    releaseDate: z.iso.date().optional(),
  })
  .strict();

export type NormalizedSet = z.infer<typeof NormalizedSetSchema>;
