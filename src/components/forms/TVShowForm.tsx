'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { tvShowSchema, type TVShowFormData } from '@/schemas';
import { Input } from '@/components/ui';

interface TVShowFormProps {
  onSubmit: (data: TVShowFormData) => void;
  defaultValues?: Partial<TVShowFormData>;
}

export function TVShowForm({ onSubmit, defaultValues }: TVShowFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TVShowFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(tvShowSchema) as any,
    defaultValues,
  });

  return (
    <form
      id="asset-form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <Input
        label="Título"
        placeholder="Nome da série"
        error={errors.title?.message}
        {...register('title')}
      />
      <div className="flex flex-col gap-1">
        <label className="text-sm text-brand-primary">Descrição</label>
        <textarea
          className="px-4 py-2 bg-brand-bg border border-white/20 rounded
                     text-white placeholder:text-white/40
                     focus:outline-none focus:border-brand-primary
                     transition-colors duration-200 min-h-[100px] resize-y"
          placeholder="Descrição da série"
          {...register('description')}
        />
        {errors.description && (
          <span className="text-xs text-red-500">
            {errors.description.message}
          </span>
        )}
      </div>
      <Input
        label="Classificação Etária"
        type="number"
        placeholder="Ex: 16"
        error={errors.recommendedAge?.message}
        {...register('recommendedAge')}
      />
    </form>
  );
}
