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
    resolver: zodResolver(seasonSchema),
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
      <div className="flex flex-col gap-1">
        <label className="text-sm text-brand-primary">Descrição</label>
        <textarea
          className="px-4 py-2 bg-brand-bg border border-white/20 rounded
                     text-white placeholder:text-white/40
                     focus:outline-none focus:border-brand-primary
                     transition-colors duration-200 min-h-[100px] resize-y"
          placeholder="Descrição da temporada"
          {...register('description')}
        />
        {errors.description && (
          <span className="text-xs text-red-500">
            {errors.description.message}
          </span>
        )}
      </div>
    </form>
  );
}
