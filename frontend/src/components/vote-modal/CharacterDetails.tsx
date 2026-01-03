import { type Waifu } from './types';
import { RecommendationCard } from './RecommendationCard';
import { ArrowLeft, Tv } from 'lucide-react';

interface CharacterDetailsProps {
    character: Waifu;
    recommendations: Waifu[];
    isVoted: boolean;
    votedCount: number;
    onVote: () => void;
    onBack: () => void;
    onSelectRecommendation: (waifu: Waifu) => void;
}

export function CharacterDetails({
    character,
    recommendations,
    isVoted,
    votedCount,
    onVote,
    onBack,
    onSelectRecommendation
}: CharacterDetailsProps) {
    return (
        <div className="flex flex-col h-full overflow-y-auto no-scrollbar pb-6 relative bg-black">
            {/* Back Button */}
            <div className="px-4 pt-4 pb-0 flex justify-between items-center">
                <button
                    onClick={onBack}
                    className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-3 h-3" />
                    Volver a buscar
                </button>
                {votedCount > 0 && (
                    <span className="text-[10px] font-medium text-[#bc80ff] bg-[#bc80ff]/10 px-2 py-0.5 rounded-full">
                        {votedCount} seleccionada{votedCount !== 1 ? 's' : ''}
                    </span>
                )}
            </div>

            {/* Main Character Info */}
            <div className="p-6 flex flex-col sm:flex-row gap-6">
                <div className="w-full sm:w-1/3 aspect-[3/4] rounded-xl overflow-hidden border border-zinc-700 shadow-lg shadow-[#bc80ff]/5 relative group">
                    <img
                        src={character.imageUrl}
                        alt={character.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/400x600?text=No+Image';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#bc80ff]/20 to-transparent opacity-50"></div>
                </div>

                <div className="flex-1 flex flex-col justify-end sm:justify-center">
                    <div className="mb-4">
                        <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight mb-1">
                            {character.name}
                        </h2>
                        <p className="text-sm text-[#bc80ff] font-medium flex items-center gap-2">
                            <Tv className="w-4 h-4" />
                            {character.source}
                        </p>
                    </div>

                    {character.description && (
                        <p className="text-sm text-zinc-400 leading-relaxed mb-6 line-clamp-4">
                            {character.description}
                        </p>
                    )}

                    <div className="flex items-center gap-4 text-xs text-zinc-500 border-t border-zinc-800 pt-4">
                        <div className="flex flex-col gap-1">
                            <span className="uppercase tracking-wider text-[10px]">Serie</span>
                            <span className="text-zinc-300 truncate max-w-[200px]">{character.source}</span>
                        </div>
                    </div>

                    {/* Action Button */}
                    <button
                        onClick={onVote}
                        disabled={isVoted}
                        className={`mt-6 w-full py-2.5 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${isVoted
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 cursor-default'
                            : 'bg-white text-black hover:bg-zinc-200 active:scale-[0.98] border border-transparent'
                            }`}
                    >
                        {isVoted ? (
                            <>
                                <span>Waifu Guardada</span>
                                <span>✓</span>
                            </>
                        ) : (
                            <>
                                <span>Confirmar Voto</span>
                                <span>+</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Recommendations Section */}
            {recommendations.length > 0 && (
                <div className="border-t border-zinc-800 bg-zinc-900/30 p-6 flex-1">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                            Recomendados para ti
                        </h4>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {recommendations.map(waifu => (
                            <RecommendationCard
                                key={waifu.id}
                                waifu={waifu}
                                onClick={() => onSelectRecommendation(waifu)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
