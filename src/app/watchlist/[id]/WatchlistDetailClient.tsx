'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Pencil, Trash2, Film } from 'lucide-react';
import { Button, AssetModal, DeleteConfirmationModal } from '@/components/ui';
import { WatchlistForm } from '@/components/forms';
import { TVShowCard } from '@/components/TVShowCard';
import { useToast } from '@/components/ui';
import { updateWatchlist, deleteWatchlist } from '@/services/watchlistService';
import { getTVShowByKey, getTVShows } from '@/services/tvShowService';
import type { Watchlist, TVShow } from '@/types';
import type { WatchlistFormData } from '@/schemas';

interface WatchlistDetailClientProps {
  watchlist: Watchlist;
}

export function WatchlistDetailClient({
  watchlist,
}: WatchlistDetailClientProps) {
  const { addToast } = useToast();
  const [linkedTVShows, setLinkedTVShows] = useState<TVShow[]>([]);
  const [allTVShows, setAllTVShows] = useState<TVShow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchTVShows = async () => {
      try {
        const [allShowsResult, linkedShows] = await Promise.all([
          getTVShows(),
          Promise.all(
            (watchlist.tvShows || []).map(ts => getTVShowByKey(ts['@key']))
          ),
        ]);
        setAllTVShows(allShowsResult);
        setLinkedTVShows(
          linkedShows.filter((show): show is TVShow => show !== null)
        );
      } catch {
        addToast('Erro ao carregar séries', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTVShows();
  }, [watchlist, addToast]);

  const handleSave = async (data: WatchlistFormData) => {
    setIsSaving(true);

    const { tvShows, ...rest } = data;

    try {
      const updated = await updateWatchlist(watchlist['@key'], {
        ...rest,
        tvShows: tvShows ?? [],
      });
      addToast(`${data.title} atualizado com sucesso!`, 'success');

      const linkedShows = await Promise.all(
        (updated.tvShows || []).map((ts: { '@key': string }) =>
          getTVShowByKey(ts['@key'])
        )
      );
      setLinkedTVShows(
        linkedShows.filter((show): show is TVShow => show !== null)
      );

      setIsEditModalOpen(false);
    } catch {
      addToast('Erro ao salvar watchlist', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    setIsSaving(true);

    try {
      await deleteWatchlist(watchlist['@key']);
      addToast(`${watchlist.title} removida com sucesso!`, 'success');
      window.location.href = '/watchlist';
    } catch {
      addToast('Erro ao remover watchlist', 'error');
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/watchlist"
          className="inline-flex items-center gap-2 text-brand-primary hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          <span>Voltar</span>
        </Link>

        <div className="bg-brand-bg border border-white/10 rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  {watchlist.title}
                </h1>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditModalOpen(true)}
                    className="p-2 bg-brand-bg border border-brand-primary rounded
                               hover:bg-brand-primary transition-all duration-300"
                    aria-label="Edit watchlist"
                  >
                    <Pencil
                      size={16}
                      className="text-brand-primary hover:text-black transition-colors"
                    />
                  </button>
                  <button
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="p-2 bg-brand-bg border border-red-500/50 rounded
                               hover:bg-red-500 transition-all duration-300"
                    aria-label="Delete watchlist"
                  >
                    <Trash2
                      size={16}
                      className="text-red-400 hover:text-white transition-colors"
                    />
                  </button>
                </div>
              </div>
              <p className="text-white/70 leading-relaxed">
                {watchlist.description}
              </p>
            </div>
          </div>
        </div>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Film size={20} />
              Séries na Watchlist
            </h2>
            <Button
              variant="secondary"
              onClick={() => setIsEditModalOpen(true)}
            >
              <Pencil size={16} className="mr-2" />
              Gerenciar Séries
            </Button>
          </div>

          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
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

          {!isLoading && linkedTVShows.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {linkedTVShows.map(show => (
                <TVShowCard key={show['@key']} show={show} />
              ))}
            </div>
          )}

          {!isLoading && linkedTVShows.length === 0 && (
            <div className="text-center text-white/60 py-12 bg-brand-bg/50 rounded-lg border border-white/10">
              <Film size={48} className="mx-auto mb-4 opacity-50" />
              <p>Nenhuma série nesta watchlist.</p>
              <p className="text-sm mt-2">
                Clique em "Gerenciar Séries" para adicionar séries.
              </p>
            </div>
          )}
        </section>
      </div>

      <AssetModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Editar Watchlist"
        submitLabel="Salvar"
        isLoading={isSaving}
        onSubmit={() => {}}
      >
        <WatchlistForm
          onSubmit={handleSave}
          availableTVShows={allTVShows}
          defaultValues={{
            title: watchlist.title,
            description: watchlist.description,
            tvShows: watchlist.tvShows || [],
          }}
        />
      </AssetModal>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={watchlist.title}
        isLoading={isSaving}
      />
    </main>
  );
}
