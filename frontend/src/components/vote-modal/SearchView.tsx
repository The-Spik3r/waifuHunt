import { CharacterCard } from './CharacterCard';
import { type Waifu } from './types';

interface SearchViewProps {
    waifus: Waifu[];
    isLoading: boolean;
    onSelectCharacter: (waifu: Waifu) => void;
}

export function SearchView({ waifus, isLoading, onSelectCharacter }: SearchViewProps) {
    if (isLoading) {
        return (
            <div className="flex-1 overflow-y-auto no-scrollbar p-2 pb-24 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#bc80ff]"></div>
                    <p className="text-xs text-zinc-500 mt-4">Cargando waifus...</p>
                </div>
            </div>
        );
    }

    if (waifus.length === 0) {
        return (
            <div className="flex-1 overflow-y-auto no-scrollbar p-2 pb-24 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-sm text-zinc-400">No se encontraron resultados</p>
                    <p className="text-xs text-zinc-600 mt-2">Intenta con otra búsqueda</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto no-scrollbar p-2 pb-24">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {waifus.map(waifu => (
                    <CharacterCard
                        key={waifu.id}
                        waifu={waifu}
                        onClick={() => onSelectCharacter(waifu)}
                    />
                ))}
            </div>
            <div className="p-4 text-center">
                <p className="text-xs text-zinc-600">Mostrando {waifus.length} resultado{waifus.length !== 1 ? 's' : ''}</p>
            </div>
        </div>
    );
}
