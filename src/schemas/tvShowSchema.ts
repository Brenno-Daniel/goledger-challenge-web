import { z } from 'zod';

export const tvShowSchema = z.object({
  title: z
    .string()
    .min(1, 'Título é obrigatório')
    .max(200, 'Título muito longo'),
  description: z
    .string()
    .min(1, 'Descrição é obrigatória')
    .max(1000, 'Descrição muito longa'),
  rating: z.string().min(1, 'Classificação é obrigatória'),
});

export type TVShowFormData = z.infer<typeof tvShowSchema>;
