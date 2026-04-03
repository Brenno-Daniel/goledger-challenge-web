'use client';

import { useState, useEffect, useMemo } from 'react';
import { Plus } from 'lucide-react';
import {
  TVShowCard,
  SearchBar,
  Button,
  AssetModal,
  DeleteConfirmationModal,
  TVShowGridSkeleton,
} from '@/components';
import { TVShowForm } from '@/components/forms';
import { useDebounce } from '@/hooks';
import { useToast } from '@/components/ui';
import {
  getTVShows,
  createTVShow,
  updateTVShow,
  deleteTVShow,
} from '@/services/tvShowService';
import type { TVShow } from '@/types';
import type { TVShowFormData } from '@/schemas';

export default function Home() {
  const { addToast } = useToast();
  const [search, setSearch] = useState('');
  const [shows, setShows] = useState<TVShow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedShow, setSelectedShow] = useState<TVShow | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  const filteredShows = useMemo(() => {
    if (!debouncedSearch) return shows;
    return shows.filter(show =>
      show.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [shows, debouncedSearch]);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const data = await getTVShows();
        setShows(data);
      } catch {
        addToast('Erro ao carregar séries', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchShows();
  }, [addToast]);

  const handleEdit = (show: TVShow) => {
    setSelectedShow(show);
    setIsEditModalOpen(true);
  };

  const handleDelete = (show: TVShow) => {
    setSelectedShow(show);
    setIsDeleteModalOpen(true);
  };

  const handleSave = async (data: TVShowFormData) => {
    setIsSaving(true);

    try {
      if (selectedShow) {
        const updated = await updateTVShow(selectedShow['@key'], data);
        setShows(prev =>
          prev.map(show =>
            show['@key'] === selectedShow['@key'] ? updated : show
          )
        );
        addToast(`${data.title} atualizado com sucesso!`, 'success');
      } else {
        const created = await createTVShow(data);
        setShows(prev => [...prev, created]);
        addToast(`${data.title} criado com sucesso!`, 'success');
      }

      setIsEditModalOpen(false);
      setSelectedShow(null);
    } catch {
      addToast('Erro ao salvar série', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedShow) return;

    setIsSaving(true);

    try {
      await deleteTVShow(selectedShow['@key']);
      setShows(prev =>
        prev.filter(show => show['@key'] !== selectedShow['@key'])
      );
      addToast(`${selectedShow.title} removido com sucesso!`, 'success');

      setIsDeleteModalOpen(false);
      setSelectedShow(null);
    } catch {
      addToast('Erro ao remover série', 'error');
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
              placeholder="Buscar séries..."
            />
          </div>
          <Button
            variant="primary"
            onClick={() => {
              setSelectedShow(null);
              setIsEditModalOpen(true);
            }}
            className="ml-4"
          >
            <Plus size={18} className="mr-2" />
            Nova Série
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredShows.map(show => (
            <TVShowCard
              key={show['@key']}
              show={show}
              onEdit={() => handleEdit(show)}
              onDelete={() => handleDelete(show)}
            />
          ))}
        </div>

        {isLoading && <TVShowGridSkeleton count={8} />}

        {!isLoading && filteredShows.length === 0 && (
          <div className="text-center text-white/60 py-12">
            <p>Nenhuma série encontrada.</p>
          </div>
        )}
      </div>

      <AssetModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedShow(null);
        }}
        title={selectedShow ? 'Editar Série' : 'Nova Série'}
        submitLabel="Salvar"
        isLoading={isSaving}
        onSubmit={() => {}}
      >
        <TVShowForm
          onSubmit={handleSave}
          defaultValues={
            selectedShow
              ? {
                  title: selectedShow.title,
                  description: selectedShow.description,
                  recommendedAge: selectedShow.recommendedAge,
                }
              : undefined
          }
        />
      </AssetModal>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedShow(null);
        }}
        onConfirm={handleConfirmDelete}
        itemName={selectedShow?.title}
        isLoading={isSaving}
      />
    </main>
  );
}
