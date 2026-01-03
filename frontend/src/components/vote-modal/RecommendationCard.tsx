import { type Waifu } from './types';

interface RecommendationCardProps {
    waifu: Waifu;
    onClick: () => void;
}

export function RecommendationCard({ waifu, onClick }: RecommendationCardProps) {
    return (
        <button onClick={onClick} className="group text-left">
            <div className="aspect-square rounded-lg bg-zinc-800 overflow-hidden mb-2 border border-zinc-800 group-hover:border-[#bc80ff]/30 transition-all">
                <img
                    src={waifu.imageUrl}
                    alt={waifu.name}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                    onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/300x300?text=No+Image';
                    }}
                />
            </div>
            <p className="text-xs font-medium text-zinc-300 group-hover:text-white truncate">
                {waifu.name}
            </p>
        </button>
    );
}
