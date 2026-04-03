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
  recommendedAge: z
    .number()
    .min(0, 'Idade mínima é 0')
    .max(18, 'Idade máxima é 18'),
});

export type TVShowFormData = z.infer<typeof tvShowSchema>;
