'use client';

import { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import {
  TVShowCard,
  SearchBar,
  Button,
  AssetModal,
  DeleteConfirmationModal,
} from '@/components';
import { TVShowForm } from '@/components/forms';
import { useDebounce } from '@/hooks';
import { useToast } from '@/components/ui';
import { mockTVShows as initialShows } from '@/constants/mockData';
import type { TVShow } from '@/types';
import type { TVShowFormData } from '@/schemas';

export default function Home() {
  const { addToast } = useToast();
  const [search, setSearch] = useState('');
  const [shows, setShows] = useState<TVShow[]>(initialShows);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedShow, setSelectedShow] = useState<TVShow | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  const filteredShows = useMemo(() => {
    return shows.filter(show =>
      show.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [shows, debouncedSearch]);

  const handleEdit = (show: TVShow) => {
    setSelectedShow(show);
    setIsEditModalOpen(true);
  };

  const handleDelete = (show: TVShow) => {
    setSelectedShow(show);
    setIsDeleteModalOpen(true);
  };

  const handleSave = async (data: TVShowFormData) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    if (selectedShow) {
      setShows(prev =>
        prev.map(show =>
          show['@key'] === selectedShow['@key'] ? { ...show, ...data } : show
        )
      );
      addToast(`${data.title} atualizado com sucesso!`, 'success');
    } else {
      const newShow: TVShow = {
        '@assetType': 'tvshow',
        '@key': `tvshow-${Date.now()}`,
        ...data,
      };
      setShows(prev => [...prev, newShow]);
      addToast(`${data.title} criado com sucesso!`, 'success');
    }

    setIsLoading(false);
    setIsEditModalOpen(false);
    setSelectedShow(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedShow) return;

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    setShows(prev =>
      prev.filter(show => show['@key'] !== selectedShow['@key'])
    );
    addToast(`${selectedShow.title} removido com sucesso!`, 'success');

    setIsLoading(false);
    setIsDeleteModalOpen(false);
    setSelectedShow(null);
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

        {filteredShows.length === 0 && (
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
        isLoading={isLoading}
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
        isLoading={isLoading}
      />
    </main>
  );
}
