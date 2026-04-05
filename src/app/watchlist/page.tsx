'use client';

import { useState, useEffect, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { WatchlistCard, SearchBar, Button, AssetModal } from '@/components';
import { WatchlistForm } from '@/components/forms';
import { useDebounce } from '@/hooks';
import { useToast } from '@/components/ui';
import {
  getWatchlists,
  createWatchlist,
  updateWatchlist,
} from '@/services/watchlistService';
import { getTVShows } from '@/services/tvShowService';
import type { Watchlist, TVShow } from '@/types';
import type { WatchlistFormData } from '@/schemas';

export default function WatchlistPage() {
  const { addToast } = useToast();
  const [search, setSearch] = useState('');
  const [watchlists, setWatchlists] = useState<Watchlist[]>([]);
  const [tvShows, setTvShows] = useState<TVShow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedWatchlist, setSelectedWatchlist] = useState<Watchlist | null>(
    null
  );
  const [isSaving, setIsSaving] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  const filteredWatchlists = useMemo(() => {
    if (!debouncedSearch) return watchlists;
    return watchlists.filter(list =>
      list.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [watchlists, debouncedSearch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [watchlistsData, tvShowsData] = await Promise.all([
          getWatchlists(),
          getTVShows(),
        ]);
        setWatchlists(watchlistsData);
        setTvShows(tvShowsData);
      } catch {
        addToast('Erro ao carregar dados', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [addToast]);

  const handleSave = async (data: WatchlistFormData) => {
    setIsSaving(true);

    const { tvShows: selectedTvShows, ...rest } = data;

    try {
      if (selectedWatchlist) {
        const updated = await updateWatchlist(selectedWatchlist['@key'], {
          ...rest,
          tvShows: selectedTvShows ?? [],
        });
        setWatchlists(prev =>
          prev.map(list =>
            list['@key'] === selectedWatchlist['@key'] ? updated : list
          )
        );
        addToast(`${data.title} atualizado com sucesso!`, 'success');
      } else {
        const created = await createWatchlist({
          ...rest,
          tvShows: selectedTvShows ?? [],
        });
        setWatchlists(prev => [...prev, created]);
        addToast(`${data.title} criado com sucesso!`, 'success');
      }

      setIsEditModalOpen(false);
      setSelectedWatchlist(null);
    } catch {
      addToast('Erro ao salvar watchlist', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1 max-w-md">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Buscar watchlists..."
            />
          </div>
          <Button
            variant="primary"
            onClick={() => {
              setSelectedWatchlist(null);
              setIsEditModalOpen(true);
            }}
            className="ml-4"
          >
            <Plus size={18} className="mr-2" />
            Nova Watchlist
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredWatchlists.map(watchlist => (
            <WatchlistCard key={watchlist['@key']} watchlist={watchlist} />
          ))}
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-brand-bg border border-white/10 rounded-lg p-4 animate-pulse"
              >
                <div className="h-5 bg-white/10 rounded w-3/4 mb-2" />
                <div className="h-4 bg-white/10 rounded w-full mb-1" />
                <div className="h-4 bg-white/10 rounded w-2/3" />
              </div>
            ))}
          </div>
        )}

        {!isLoading && filteredWatchlists.length === 0 && (
          <div className="text-center text-white/60 py-12">
            <p>Nenhuma watchlist encontrada.</p>
          </div>
        )}
      </div>

      <AssetModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedWatchlist(null);
        }}
        title={selectedWatchlist ? 'Editar Watchlist' : 'Nova Watchlist'}
        submitLabel="Salvar"
        isLoading={isSaving}
        onSubmit={() => {}}
      >
        <WatchlistForm
          onSubmit={handleSave}
          availableTVShows={tvShows}
          defaultValues={
            selectedWatchlist
              ? {
                  title: selectedWatchlist.title,
                  description: selectedWatchlist.description,
                  tvShows: selectedWatchlist.tvShows || [],
                }
              : undefined
          }
        />
      </AssetModal>
    </main>
  );
}
