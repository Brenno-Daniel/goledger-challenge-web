import { z } from 'zod';

export const seasonSchema = z.object({
  number: z.number().min(1, 'Número deve ser maior que 0'),
  description: z
    .string()
    .min(1, 'Descrição é obrigatória')
    .max(500, 'Descrição muito longa'),
});

export type SeasonFormData = z.infer<typeof seasonSchema>;
