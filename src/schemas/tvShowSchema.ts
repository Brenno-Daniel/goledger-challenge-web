import { z } from 'zod';

const recommendedAgeSchema = z.coerce
  .number()
  .int()
  .min(0, 'Idade mínima é 0')
  .max(18, 'Idade máxima é 18')
  .refine(val => !isNaN(val), {
    message: 'Classificação etária é obrigatória',
  });

export const tvShowSchema = z.object({
  title: z
    .string()
    .min(1, 'Título é obrigatório')
    .max(200, 'Título muito longo'),
  description: z
    .string()
    .min(1, 'Descrição é obrigatória')
    .max(1000, 'Descrição muito longa'),
  recommendedAge: recommendedAgeSchema,
});

export type TVShowFormData = z.infer<typeof tvShowSchema>;
