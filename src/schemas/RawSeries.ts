import { z } from 'zod';
import { LANGUAGES } from '../constants';

export const RawSeriesSchema = z
  .object({
    id: z.string(),
    name: z.partialRecord(z.enum(LANGUAGES), z.string()),
    energies: z.array(z.string()).optional(),
  })
  .strict();

export type RawSeries = z.infer<typeof RawSeriesSchema>;
