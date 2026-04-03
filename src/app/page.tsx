'use client';

import { useState, useMemo } from 'react';
import { TVShowCard, SearchBar } from '@/components';
import { useDebounce } from '@/hooks';
import { mockTVShows } from '@/constants/mockData';

export default function Home() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  const filteredShows = useMemo(() => {
    return mockTVShows.filter(show =>
      show.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [debouncedSearch]);

  return (
    <main className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Buscar séries..."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredShows.map(show => (
            <TVShowCard
              key={show['@key']}
              show={show}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          ))}
        </div>

        {filteredShows.length === 0 && (
          <div className="text-center text-white/60 py-12">
            <p>Nenhuma série encontrada.</p>
          </div>
        )}
      </div>
    </main>
  );
}
