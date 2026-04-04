import { z } from 'zod';

const numberSchema = z.coerce
  .number()
  .int()
  .min(1, 'Número deve ser maior que 0');

const yearSchema = z.coerce
  .number()
  .int()
  .min(1900, 'Ano inválido')
  .max(2100, 'Ano inválido');

export const seasonSchema = z.object({
  number: numberSchema,
  year: yearSchema,
  description: z
    .string()
    .min(1, 'Descrição é obrigatória')
    .max(500, 'Descrição muito longa'),
});

export type SeasonFormData = z.infer<typeof seasonSchema>;
