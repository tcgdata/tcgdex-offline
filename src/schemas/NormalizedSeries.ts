import { z } from 'zod';
import { RawSeriesSchema } from './RawSeries';

export const NormalizedSeriesSchema = RawSeriesSchema.pick({ id: true })
  .extend({
    name: z.string(),
  })
  .strict();

export type NormalizedSeries = z.infer<typeof NormalizedSeriesSchema>;
