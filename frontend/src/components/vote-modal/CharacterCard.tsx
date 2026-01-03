import { type Waifu } from './types';

interface CharacterCardProps {
    waifu: Waifu;
    onClick: () => void;
}

export function CharacterCard({ waifu, onClick }: CharacterCardProps) {
    return (
        <button
            onClick={onClick}
            className="group p-2 rounded-xl hover:bg-zinc-900 transition-colors text-left flex flex-col gap-2 relative"
        >
            <div className="aspect-[3/4] w-full bg-zinc-800 rounded-lg overflow-hidden relative border border-zinc-800 group-hover:border-[#bc80ff]/30 transition-colors">
                <img
                    src={waifu.imageUrl}
                    alt={waifu.name}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/400x600?text=No+Image';
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>
            <div>
                <h3 className="text-sm font-medium text-zinc-200 group-hover:text-white truncate">{waifu.name}</h3>
                <p className="text-xs text-zinc-500 truncate">{waifu.source}</p>
            </div>
        </button>
    );
}
