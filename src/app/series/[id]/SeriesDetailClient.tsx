'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import {
  Badge,
  Button,
  AssetModal,
  DeleteConfirmationModal,
} from '@/components/ui';
import { SeasonCard } from '@/components/SeasonCard';
import { SeasonForm } from '@/components/forms';
import { useToast } from '@/components/ui';
import {
  createSeason,
  updateSeason,
  deleteSeason,
} from '@/services/tvShowService';
import type { TVShow, Season } from '@/types';
import type { SeasonFormData } from '@/schemas';

interface SeriesDetailClientProps {
  show: TVShow;
  initialSeasons: Season[];
}

export function SeriesDetailClient({
  show,
  initialSeasons,
}: SeriesDetailClientProps) {
  const { addToast } = useToast();
  const [seasons, setSeasons] = useState<Season[]>(initialSeasons);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleEdit = (season: Season) => {
    setSelectedSeason(season);
    setIsEditModalOpen(true);
  };

  const handleDelete = (season: Season) => {
    setSelectedSeason(season);
    setIsDeleteModalOpen(true);
  };

  const handleSave = async (data: SeasonFormData) => {
    setIsSaving(true);

    try {
      if (selectedSeason) {
        const updated = await updateSeason(selectedSeason['@key'], data);
        setSeasons(prev =>
          prev.map(season =>
            season['@key'] === selectedSeason['@key'] ? updated : season
          )
        );
        addToast(`Temporada ${data.number} atualizada com sucesso!`, 'success');
      } else {
        const created = await createSeason({
          ...data,
          tvShow: { '@key': show['@key'] },
        });
        setSeasons(prev => [...prev, created]);
        addToast(`Temporada ${data.number} criada com sucesso!`, 'success');
      }

      setIsEditModalOpen(false);
      setSelectedSeason(null);
    } catch {
      addToast('Erro ao salvar temporada', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedSeason) return;

    setIsSaving(true);

    try {
      await deleteSeason(selectedSeason['@key']);
      setSeasons(prev =>
        prev.filter(season => season['@key'] !== selectedSeason['@key'])
      );
      addToast(`Temporada removida com sucesso!`, 'success');

      setIsDeleteModalOpen(false);
      setSelectedSeason(null);
    } catch {
      addToast('Erro ao remover temporada', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          whileHover={{ x: -4 }}
          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-brand-primary hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            <span>Voltar</span>
          </Link>
        </motion.div>

        <div className="bg-brand-bg border border-white/10 rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  {show.title}
                </h1>
                <Badge rating={show.recommendedAge} />
              </div>
              <p className="text-white/70 leading-relaxed">
                {show.description}
              </p>
            </div>
          </div>
        </div>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Temporadas</h2>
            <Button
              variant="primary"
              onClick={() => {
                setSelectedSeason(null);
                setIsEditModalOpen(true);
              }}
            >
              <Plus size={18} className="mr-2" />
              Nova Temporada
            </Button>
          </div>

          {seasons.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {seasons.map(season => (
                <SeasonCard
                  key={season['@key']}
                  season={season}
                  tvShowId={show['@key']}
                  onEdit={() => handleEdit(season)}
                  onDelete={() => handleDelete(season)}
                />
              ))}
            </div>
          )}

          {seasons.length === 0 && (
            <p className="text-white/60">Nenhuma temporada disponível.</p>
          )}
        </section>
      </div>

      <AssetModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedSeason(null);
        }}
        title={selectedSeason ? 'Editar Temporada' : 'Nova Temporada'}
        submitLabel="Salvar"
        isLoading={isSaving}
        onSubmit={() => {}}
      >
        <SeasonForm
          onSubmit={handleSave}
          defaultValues={
            selectedSeason
              ? {
                  number: selectedSeason.number,
                  year: selectedSeason.year,
                }
              : undefined
          }
        />
      </AssetModal>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedSeason(null);
        }}
        onConfirm={handleConfirmDelete}
        itemName={`Temporada ${selectedSeason?.number}`}
        isLoading={isSaving}
      />
    </main>
  );
}
