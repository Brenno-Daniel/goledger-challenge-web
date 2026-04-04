import { z } from 'zod';

export const watchlistSchema = z.object({
  title: z
    .string()
    .min(1, 'Título é obrigatório')
    .max(200, 'Título muito longo'),
  description: z
    .string()
    .min(1, 'Descrição é obrigatória')
    .max(500, 'Descrição muito longa'),
  tvShows: z
    .array(
      z.object({
        '@assetType': z.string(),
        '@key': z.string(),
      })
    )
    .optional(),
});

export type WatchlistFormData = z.infer<typeof watchlistSchema>;
