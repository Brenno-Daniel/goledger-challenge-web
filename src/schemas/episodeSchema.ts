import { z } from 'zod';

export const episodeSchema = z.object({
  number: z.number().min(1, 'Número deve ser maior que 0'),
  name: z.string().min(1, 'Nome é obrigatório').max(200, 'Nome muito longo'),
  description: z
    .string()
    .min(1, 'Descrição é obrigatória')
    .max(1000, 'Descrição muito longa'),
  duration: z
    .string()
    .min(1, 'Duração é obrigatória')
    .regex(/^\d+:\d{2}$/, 'Formato: mm:ss ou hh:mm:ss'),
});

export type EpisodeFormData = z.infer<typeof episodeSchema>;
