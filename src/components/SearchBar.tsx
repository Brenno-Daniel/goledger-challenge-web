import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search...',
}: SearchBarProps) {
  return (
    <div className="relative w-full">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
        size={18}
      />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-10 py-2 bg-brand-bg border border-white/20 rounded
                   text-white placeholder:text-white/40
                   focus:outline-none focus:border-brand-primary
                   transition-colors duration-200"
      />
    </div>
  );
}
