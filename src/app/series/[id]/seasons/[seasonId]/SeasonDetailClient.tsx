'use client';

import { useState } from 'react';
import { ChevronRight, Plus } from 'lucide-react';
import Link from 'next/link';
import { Button, AssetModal, DeleteConfirmationModal } from '@/components/ui';
import { EpisodeCard } from '@/components/EpisodeCard';
import { EpisodeForm } from '@/components/forms';
import { useToast } from '@/components/ui';
import {
  createEpisode,
  updateEpisode,
  deleteEpisode,
} from '@/services/tvShowService';
import type { TVShow, Season, Episode } from '@/types';
import type { EpisodeFormData } from '@/schemas';

interface SeasonDetailClientProps {
  show: TVShow;
  season: Season;
  initialEpisodes: Episode[];
}

export function SeasonDetailClient({
  show,
  season,
  initialEpisodes,
}: SeasonDetailClientProps) {
  const { addToast } = useToast();
  const [episodes, setEpisodes] = useState<Episode[]>(initialEpisodes);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleEdit = (episode: Episode) => {
    setSelectedEpisode(episode);
    setIsEditModalOpen(true);
  };

  const handleDelete = (episode: Episode) => {
    setSelectedEpisode(episode);
    setIsDeleteModalOpen(true);
  };

  const formatDateToRFC3339 = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toISOString();
  };

  const handleSave = async (data: EpisodeFormData) => {
    setIsSaving(true);

    try {
      const formattedData = {
        ...data,
        releaseDate: formatDateToRFC3339(data.releaseDate),
      };

      if (selectedEpisode) {
        const updated = await updateEpisode(
          selectedEpisode['@key'],
          formattedData
        );
        setEpisodes(prev =>
          prev.map(ep =>
            ep['@key'] === selectedEpisode['@key'] ? updated : ep
          )
        );
        addToast(`Episódio atualizado com sucesso!`, 'success');
      } else {
        const created = await createEpisode({
          ...formattedData,
          season: { '@key': season['@key'] },
        });
        setEpisodes(prev => [...prev, created]);
        addToast(`Episódio criado com sucesso!`, 'success');
      }

      setIsEditModalOpen(false);
      setSelectedEpisode(null);
    } catch {
      addToast('Erro ao salvar episódio', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedEpisode) return;

    setIsSaving(true);

    try {
      await deleteEpisode(selectedEpisode['@key']);
      setEpisodes(prev =>
        prev.filter(ep => ep['@key'] !== selectedEpisode['@key'])
      );
      addToast(`Episódio removido com sucesso!`, 'success');

      setIsDeleteModalOpen(false);
      setSelectedEpisode(null);
    } catch {
      addToast('Erro ao remover episódio', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
          <Link href="/" className="hover:text-brand-primary transition-colors">
            Séries
          </Link>
          <ChevronRight size={16} />
          <Link
            href={`/series/${encodeURIComponent(show['@key'])}`}
            className="hover:text-brand-primary transition-colors"
          >
            {show.title}
          </Link>
          <ChevronRight size={16} />
          <span className="text-white">Temporada {season.number}</span>
        </nav>

        <div className="bg-brand-bg border border-white/10 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Temporada {season.number}
            </h1>
            {season.year && (
              <span className="text-lg text-white/60">({season.year})</span>
            )}
          </div>
        </div>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Episódios</h2>
            <Button
              variant="primary"
              onClick={() => {
                setSelectedEpisode(null);
                setIsEditModalOpen(true);
              }}
            >
              <Plus size={18} className="mr-2" />
              Novo Episódio
            </Button>
          </div>

          {episodes.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {episodes.map(episode => (
                <EpisodeCard
                  key={episode['@key']}
                  episode={episode}
                  onEdit={() => handleEdit(episode)}
                  onDelete={() => handleDelete(episode)}
                />
              ))}
            </div>
          )}

          {episodes.length === 0 && (
            <p className="text-white/60">Nenhum episódio disponível.</p>
          )}
        </section>
      </div>

      <AssetModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedEpisode(null);
        }}
        title={selectedEpisode ? 'Editar Episódio' : 'Novo Episódio'}
        submitLabel="Salvar"
        isLoading={isSaving}
        onSubmit={() => {}}
      >
        <EpisodeForm
          onSubmit={handleSave}
          defaultValues={
            selectedEpisode
              ? {
                  episodeNumber: selectedEpisode.episodeNumber,
                  title: selectedEpisode.title,
                  description: selectedEpisode.description,
                  rating: selectedEpisode.rating,
                  releaseDate: selectedEpisode.releaseDate.split('T')[0],
                }
              : undefined
          }
        />
      </AssetModal>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedEpisode(null);
        }}
        onConfirm={handleConfirmDelete}
        itemName={selectedEpisode?.title}
        isLoading={isSaving}
      />
    </main>
  );
}
