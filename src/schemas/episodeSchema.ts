import { z } from 'zod';

export const episodeSchema = z.object({
  episodeNumber: z.number().min(1, 'Número deve ser maior que 0'),
  title: z
    .string()
    .min(1, 'Título é obrigatório')
    .max(200, 'Título muito longo'),
  description: z
    .string()
    .min(1, 'Descrição é obrigatória')
    .max(1000, 'Descrição muito longa'),
  rating: z.number().min(0, 'Nota mínima é 0').max(10, 'Nota máxima é 10'),
  releaseDate: z.string().min(1, 'Data de lançamento é obrigatória'),
});

export type EpisodeFormData = z.infer<typeof episodeSchema>;
