'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { episodeSchema, type EpisodeFormData } from '@/schemas';
import { Input } from '@/components/ui';

interface EpisodeFormProps {
  onSubmit: (data: EpisodeFormData) => void;
  defaultValues?: Partial<EpisodeFormData>;
}

export function EpisodeForm({ onSubmit, defaultValues }: EpisodeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EpisodeFormData>({
    resolver: zodResolver(episodeSchema),
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
          label="Número do Episódio"
          type="number"
          placeholder="1"
          error={errors.episodeNumber?.message}
          {...register('episodeNumber', { valueAsNumber: true })}
        />
        <Input
          label="Nota (0-10)"
          type="number"
          step="0.1"
          placeholder="9.5"
          error={errors.rating?.message}
          {...register('rating', { valueAsNumber: true })}
        />
      </div>
      <Input
        label="Título"
        placeholder="Título do episódio"
        error={errors.title?.message}
        {...register('title')}
      />
      <div className="flex flex-col gap-1">
        <label className="text-sm text-brand-primary">Descrição</label>
        <textarea
          className="px-4 py-2 bg-brand-bg border border-white/20 rounded
                     text-white placeholder:text-white/40
                     focus:outline-none focus:border-brand-primary
                     transition-colors duration-200 min-h-[80px] resize-y"
          placeholder="Descrição do episódio"
          {...register('description')}
        />
        {errors.description && (
          <span className="text-xs text-red-500">
            {errors.description.message}
          </span>
        )}
      </div>
      <Input
        label="Data de Lançamento"
        type="date"
        error={errors.releaseDate?.message}
        {...register('releaseDate')}
      />
    </form>
  );
}
