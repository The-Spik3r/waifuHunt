import { useState, useEffect, useRef } from 'react';

interface CharData {
    name: string;
    anime: string;
    img: string;
}

interface VotedCharacter extends CharData {
    id: string;
}

export default function VoteModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [currentCharacter, setCurrentCharacter] = useState<string>('');
    const [votedCharacters, setVotedCharacters] = useState<VotedCharacter[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const searchInputRef = useRef<HTMLInputElement>(null);

    const isCharacterVoted = (id: string) => votedCharacters.some(char => char.id === id);

    useEffect(() => {
        if (isOpen && searchInputRef.current) {
            setTimeout(() => searchInputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    const toggleModal = (show: boolean) => {
        setIsOpen(show);
        if (!show) {
            setTimeout(() => {
                setShowDetails(false);
                setSearchQuery('');
            }, 300);
        }
    };

    const handleShowDetails = (id: string) => {
        setCurrentCharacter(id);
        setShowDetails(true);
    };

    const handleBackToSearch = () => {
        setShowDetails(false);
    };

    const handleAddVote = () => {
        if (!currentCharacter || isCharacterVoted(currentCharacter)) return;

        const data = charData[currentCharacter];
        setVotedCharacters(prev => [...prev, { ...data, id: currentCharacter }]);
    };

    const handleSubmitVotes = () => {
        alert('¡Votos enviados exitosamente!');
        setVotedCharacters([]);
        toggleModal(false);
    };

    const currentData = currentCharacter ? charData[currentCharacter] : null;

    return (
        <>
            {/* Background Ambient Effects */}
            

            {/* Main Content */}
            <main className="relative z-10 flex flex-col items-center gap-6">

                <button
                    onClick={() => toggleModal(true)}
                    className="group relative px-8 py-3 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-[#bc80ff]/50 transition-all duration-300 overflow-hidden shadow-2xl shadow-black"
                >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#bc80ff]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <div className="flex items-center gap-3 relative z-10">
                        <span className="text-4xl font-primary font-medium tracking-wide">Votar Ahora</span>
                    </div>
                </button>
            </main>

            {/* Modal Overlay */}
            {isOpen && (
                <div
                    className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={(e) => e.target === e.currentTarget && toggleModal(false)}
                >
                    {/* Modal Container */}
                    <div className={`w-full max-w-2xl bg-black/90 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden transform transition-transform duration-300 flex flex-col max-h-[85vh] relative ${isOpen ? 'scale-100' : 'scale-95'}`}>

                        {/* Header / Search */}
                        <div className="p-4 border-b border-zinc-800 sticky top-0 bg-black/80 backdrop-blur-md z-20 flex gap-3 items-center">
                            <div className="relative group flex-1">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#bc80ff] transition-colors">
                                    🔍
                                </span>
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Buscar personaje..."
                                    className="w-full bg-zinc-900/50 text-sm text-white placeholder-zinc-600 rounded-lg py-2.5 pl-10 pr-10 border border-zinc-800 focus:outline-none focus:border-[#bc80ff]/50 focus:ring-1 focus:ring-[#bc80ff]/50 transition-all"
                                />
                            </div>
                            <button
                                onClick={() => toggleModal(false)}
                                className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-all"
                            >
                                ✕
                            </button>
                        </div>

                        {/* View 1: Search Results List */}
                        {!showDetails && (
                            <div className="flex-1 overflow-y-auto no-scrollbar p-2 pb-24">
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    <button
                                        onClick={() => handleShowDetails('makima')}
                                        className="group p-2 rounded-xl hover:bg-zinc-900 transition-colors text-left flex flex-col gap-2 relative"
                                    >
                                        <div className="aspect-[3/4] w-full bg-zinc-800 rounded-lg overflow-hidden relative border border-zinc-800 group-hover:border-[#bc80ff]/30 transition-colors">
                                            <img
                                                src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1000&auto=format&fit=crop"
                                                alt="Makima"
                                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                            <div className="absolute bottom-2 left-2">
                                                <span className="text-[10px] font-medium uppercase tracking-wider text-[#bc80ff] bg-[#bc80ff]/10 px-1.5 py-0.5 rounded border border-[#bc80ff]/20">Control</span>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-zinc-200 group-hover:text-white">Makima</h3>
                                            <p className="text-xs text-zinc-500">Chainsaw Man</p>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => handleShowDetails('yor')}
                                        className="group p-2 rounded-xl hover:bg-zinc-900 transition-colors text-left flex flex-col gap-2"
                                    >
                                        <div className="aspect-[3/4] w-full bg-zinc-800 rounded-lg overflow-hidden relative border border-zinc-800 group-hover:border-[#bc80ff]/30 transition-colors">
                                            <img
                                                src="https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1000&auto=format&fit=crop"
                                                alt="Yor Forger"
                                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                            <div className="absolute bottom-2 left-2">
                                                <span className="text-[10px] font-medium uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded border border-emerald-400/20">Assassin</span>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-zinc-200 group-hover:text-white">Yor Forger</h3>
                                            <p className="text-xs text-zinc-500">Spy x Family</p>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => handleShowDetails('lucy')}
                                        className="group p-2 rounded-xl hover:bg-zinc-900 transition-colors text-left flex flex-col gap-2"
                                    >
                                        <div className="aspect-[3/4] w-full bg-zinc-800 rounded-lg overflow-hidden relative border border-zinc-800 group-hover:border-[#bc80ff]/30 transition-colors">
                                            <img
                                                src="https://images.unsplash.com/photo-1560972550-aba3456b5564?q=80&w=1000&auto=format&fit=crop"
                                                alt="Lucy"
                                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                            <div className="absolute bottom-2 left-2">
                                                <span className="text-[10px] font-medium uppercase tracking-wider text-blue-400 bg-blue-400/10 px-1.5 py-0.5 rounded border border-blue-400/20">Netrunner</span>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-zinc-200 group-hover:text-white">Lucy</h3>
                                            <p className="text-xs text-zinc-500">Cyberpunk: Edgerunners</p>
                                        </div>
                                    </button>
                                </div>
                                <div className="p-4 text-center">
                                    <p className="text-xs text-zinc-600">Mostrando resultados principales</p>
                                </div>
                            </div>
                        )}

                        {/* View 2: Details & Recommendations */}
                        {showDetails && currentData && (
                            <div className="flex flex-col h-full overflow-y-auto no-scrollbar pb-6 relative bg-black">
                                {/* Back Button */}
                                <div className="px-4 pt-4 pb-0 flex justify-between items-center">
                                    <button
                                        onClick={handleBackToSearch}
                                        className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white transition-colors"
                                    >
                                        ← Volver a buscar
                                    </button>
                                    {votedCharacters.length > 0 && (
                                        <span className="text-[10px] font-medium text-[#bc80ff] bg-[#bc80ff]/10 px-2 py-0.5 rounded-full">
                                            {votedCharacters.length} seleccionada{votedCharacters.length !== 1 ? 's' : ''}
                                        </span>
                                    )}
                                </div>

                                {/* Main Character Info */}
                                <div className="p-6 flex flex-col sm:flex-row gap-6">
                                    <div className="w-full sm:w-1/3 aspect-[3/4] rounded-xl overflow-hidden border border-zinc-700 shadow-lg shadow-[#bc80ff]/5 relative group">
                                        <img
                                            src={currentData.img}
                                            alt={currentData.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#bc80ff]/20 to-transparent opacity-50"></div>
                                    </div>
                                    <div className="flex-1 flex flex-col justify-end sm:justify-center">
                                        <div className="mb-4">
                                            <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight mb-1">
                                                {currentData.name}
                                            </h2>
                                            <p className="text-sm text-[#bc80ff] font-medium flex items-center gap-2">
                                                📺 {currentData.anime}
                                            </p>
                                        </div>

                                        <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                                            Una netrunner talentosa de Night City que sueña con escapar a la Luna. Introvertida pero profundamente leal a aquellos que ganan su confianza.
                                        </p>

                                        <div className="flex items-center gap-4 text-xs text-zinc-500 border-t border-zinc-800 pt-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="uppercase tracking-wider text-[10px]">Rol</span>
                                                <span className="text-zinc-300">Netrunner</span>
                                            </div>
                                            <div className="w-px h-8 bg-zinc-800"></div>
                                            <div className="flex flex-col gap-1">
                                                <span className="uppercase tracking-wider text-[10px]">Popularidad</span>
                                                <span className="text-[#bc80ff]">#1 Global</span>
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <button
                                            onClick={handleAddVote}
                                            disabled={isCharacterVoted(currentCharacter)}
                                            className={`mt-6 w-full py-2.5 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${isCharacterVoted(currentCharacter)
                                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 cursor-default'
                                                    : 'bg-white text-black hover:bg-zinc-200 active:scale-[0.98] border border-transparent'
                                                }`}
                                        >
                                            {isCharacterVoted(currentCharacter) ? (
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
                                <div className="border-t border-zinc-800 bg-zinc-900/30 p-6 flex-1">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-xs font-medium uppercase tracking-wider text-zinc-500">Recomendados para ti</h4>
                                    </div>

                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                        {['rebecca', 'kiwi', 'david', 'power'].map(id => (
                                            <button
                                                key={id}
                                                onClick={() => handleShowDetails(id)}
                                                className="group text-left"
                                            >
                                                <div className="aspect-square rounded-lg bg-zinc-800 overflow-hidden mb-2 border border-zinc-800 group-hover:border-[#bc80ff]/30 transition-all">
                                                    <img
                                                        src={charData[id].img}
                                                        alt={charData[id].name}
                                                        className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                                                    />
                                                </div>
                                                <p className="text-xs font-medium text-zinc-300 group-hover:text-white truncate">
                                                    {charData[id].name}
                                                </p>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Floating Submit Bar */}
                        {votedCharacters.length > 0 && (
                            <div className={`absolute bottom-0 left-0 w-full bg-black/70 backdrop-blur-md border-t border-zinc-800 p-4 transform transition-transform duration-300 z-30 flex items-center justify-between ${!showDetails ? 'translate-y-0' : 'translate-y-full'
                                }`}>
                                <div className="flex items-center gap-3">
                                    <div className="flex -space-x-2 pl-1">
                                        {votedCharacters.map((char) => (
                                            <img
                                                key={char.id}
                                                src={char.img}
                                                alt={char.name}
                                                title={char.name}
                                                className="w-8 h-8 rounded-full border-2 border-[#18181b] object-cover ring-0 hover:scale-110 hover:z-10 transition-transform cursor-help"
                                            />
                                        ))}
                                    </div>

                                    <div className="flex flex-col ml-1">
                                        <span className="text-xs font-medium text-white">
                                            {votedCharacters.length} Waifu{votedCharacters.length !== 1 ? 's' : ''} seleccionada{votedCharacters.length !== 1 ? 's' : ''}
                                        </span>
                                        <span className="text-[10px] text-zinc-500">Listas para enviar</span>
                                    </div>
                                </div>
                                <button
                                    onClick={handleSubmitVotes}
                                    className="px-5 py-2 bg-[#bc80ff] hover:bg-[#a860ff] text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-[#bc80ff]/20"
                                >
                                    Enviar Votos
                                    <span>📤</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </>
    );
}