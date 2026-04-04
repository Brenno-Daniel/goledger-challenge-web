'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { seasonSchema, type SeasonFormData } from '@/schemas';
import { Input } from '@/components/ui';

interface SeasonFormProps {
  onSubmit: (data: SeasonFormData) => void;
  defaultValues?: Partial<SeasonFormData>;
}

export function SeasonForm({ onSubmit, defaultValues }: SeasonFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SeasonFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(seasonSchema) as any,
    defaultValues,
  });

  return (
    <form
      id="asset-form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Número da Temporada"
          type="number"
          placeholder="1"
          error={errors.number?.message}
          {...register('number')}
        />
        <Input
          label="Ano"
          type="number"
          placeholder="2024"
          error={errors.year?.message}
          {...register('year')}
        />
      </div>
    </form>
  );
}
