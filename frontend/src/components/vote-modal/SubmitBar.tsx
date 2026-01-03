import type { VotedCharacter } from './types';
import { Send } from 'lucide-react';

interface SubmitBarProps {
    votedCharacters: VotedCharacter[];
    isVisible: boolean;
    onSubmit: () => void;
}

export function SubmitBar({ votedCharacters, isVisible, onSubmit }: SubmitBarProps) {
    if (votedCharacters.length === 0) return null;

    return (
        <div
            className={`absolute bottom-0 left-0 w-full bg-black/70 backdrop-blur-md border-t border-zinc-800 p-4 transform transition-transform duration-300 z-30 flex items-center justify-between ${isVisible ? 'translate-y-0' : 'translate-y-full'
                }`}
        >
            <div className="flex items-center gap-3">
                <div className="flex -space-x-2 pl-1">
                    {votedCharacters.map((char) => (
                        <img
                            key={char.id}
                            src={char.imageUrl}
                            alt={char.name}
                            title={char.name}
                            className="w-8 h-8 rounded-full border-2 border-[#18181b] object-cover ring-0 hover:scale-110 hover:z-10 transition-transform cursor-help"
                        />
                    ))}
                </div>

                <div className="flex flex-col ml-1">
                    <span className="text-xs font-medium text-white">
                        {votedCharacters.length} Waifu{votedCharacters.length !== 1 ? 's' : ''} seleccionada
                        {votedCharacters.length !== 1 ? 's' : ''}
                    </span>
                    <span className="text-[10px] text-zinc-500">Listas para enviar</span>
                </div>
            </div>

            <button
                onClick={onSubmit}
                className="px-5 py-2 bg-[#bc80ff] hover:bg-[#a860ff] text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-[#bc80ff]/20"
            >
                Enviar Votos
                <Send className="w-4 h-4" />
            </button>
        </div>
    );
}
