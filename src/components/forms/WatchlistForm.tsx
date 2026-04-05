'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { watchlistSchema, type WatchlistFormData } from '@/schemas';
import { Input } from '@/components/ui';
import type { TVShow } from '@/types';
import { Check, Search } from 'lucide-react';
import { useState, useMemo, useCallback } from 'react';

interface WatchlistFormProps {
  onSubmit: (data: WatchlistFormData) => void;
  defaultValues?: Partial<WatchlistFormData>;
  availableTVShows?: TVShow[];
}

export function WatchlistForm({
  onSubmit,
  defaultValues,
  availableTVShows = [],
}: WatchlistFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<WatchlistFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(watchlistSchema) as any,
    defaultValues: {
      ...defaultValues,
      tvShows: defaultValues?.tvShows || [],
    },
  });

  const [search, setSearch] = useState('');

  const filteredShows = useMemo(() => {
    if (!search) return availableTVShows;
    return availableTVShows.filter(show =>
      show.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [availableTVShows, search]);

  const handleCheckboxChange = useCallback(
    (
      field: {
        value: WatchlistFormData['tvShows'];
        onChange: (value: WatchlistFormData['tvShows']) => void;
      },
      showKey: string,
      isCurrentlySelected: boolean
    ) => {
      if (isCurrentlySelected) {
        field.onChange([
          ...(field.value || []),
          { '@assetType': 'tvShows', '@key': showKey },
        ]);
      } else {
        field.onChange(
          (field.value || []).filter(
            (ts: { '@key': string }) => ts['@key'] !== showKey
          )
        );
      }
    },
    []
  );

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
                     transition-colors duration-200 min-h-[80px] resize-y"
          placeholder="Descrição da lista"
          {...register('description')}
        />
        {errors.description && (
          <span className="text-xs text-red-500">
            {errors.description.message}
          </span>
        )}
      </div>

      {availableTVShows.length > 0 && (
        <div className="flex flex-col gap-2">
          <label className="text-sm text-brand-primary">
            Séries ({availableTVShows.length})
          </label>

          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
            />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar séries..."
              className="w-full pl-9 pr-4 py-2 bg-brand-bg border border-white/20 rounded
                         text-sm text-white placeholder:text-white/40
                         focus:outline-none focus:border-brand-primary
                         transition-colors duration-200"
            />
          </div>

          <div className="max-h-48 overflow-y-auto border border-white/20 rounded p-2 space-y-1 scrollbar-thin">
            {filteredShows.map(show => (
              <Controller
                key={show['@key']}
                name="tvShows"
                control={control}
                render={({ field }) => {
                  const isSelected = field.value?.some(
                    (ts: { '@key': string }) => ts['@key'] === show['@key']
                  );
                  return (
                    <div
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={0}
                      onClick={() =>
                        handleCheckboxChange(field, show['@key'], !isSelected)
                      }
                      onKeyDown={e => {
                        if (e.key === ' ' || e.key === 'Enter') {
                          e.preventDefault();
                          handleCheckboxChange(
                            field,
                            show['@key'],
                            !isSelected
                          );
                        }
                      }}
                      className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-white/5 transition-colors select-none"
                    >
                      <div
                        className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-brand-primary border-brand-primary'
                            : 'border-white/40'
                        }`}
                      >
                        {isSelected && (
                          <Check size={14} className="text-black" />
                        )}
                      </div>
                      <span className="text-sm text-white/80 line-clamp-1">
                        {show.title}
                      </span>
                    </div>
                  );
                }}
              />
            ))}
            {filteredShows.length === 0 && (
              <p className="text-sm text-white/40 text-center py-4">
                Nenhuma série encontrada.
              </p>
            )}
          </div>
          {errors.tvShows && (
            <span className="text-xs text-red-500">
              {errors.tvShows.message}
            </span>
          )}
        </div>
      )}
    </form>
  );
}
