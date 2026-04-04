'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { watchlistSchema, type WatchlistFormData } from '@/schemas';
import { Input } from '@/components/ui';

interface WatchlistFormProps {
  onSubmit: (data: WatchlistFormData) => void;
  defaultValues?: Partial<WatchlistFormData>;
}

export function WatchlistForm({ onSubmit, defaultValues }: WatchlistFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WatchlistFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(watchlistSchema) as any,
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
        placeholder="Nome da lista"
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
          placeholder="Descrição da lista"
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
