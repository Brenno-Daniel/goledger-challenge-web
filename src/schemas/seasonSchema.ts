import { z } from 'zod';

export const seasonSchema = z.object({
  number: z.coerce.number().int().min(1, 'Número deve ser maior que 0'),
  year: z.coerce
    .number()
    .int()
    .min(1900, 'Ano inválido')
    .max(2100, 'Ano inválido'),
});

export type SeasonFormData = z.infer<typeof seasonSchema>;
