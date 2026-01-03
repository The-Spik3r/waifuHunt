import { type RefObject } from 'react';
import { Search, X } from 'lucide-react';

interface SearchHeaderProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    onClose: () => void;
    searchInputRef: RefObject<HTMLInputElement | null>;
}

export function SearchHeader({ searchQuery, onSearchChange, onClose, searchInputRef }: SearchHeaderProps) {
    return (
        <div className="p-4 border-b border-zinc-800 sticky top-0 bg-black/80 backdrop-blur-md z-20 flex gap-3 items-center">
            <div className="relative group flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#bc80ff] transition-colors w-4 h-4" />
                <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Buscar personaje..."
                    className="w-full bg-zinc-900/50 text-sm text-white placeholder-zinc-600 rounded-lg py-2.5 pl-10 pr-10 border border-zinc-800 focus:outline-none focus:border-[#bc80ff]/50 focus:ring-1 focus:ring-[#bc80ff]/50 transition-all"
                />
            </div>
            <button
                onClick={onClose}
                className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-all"
            >
                <X className="w-5 h-5" />
            </button>
        </div>
    );
}
