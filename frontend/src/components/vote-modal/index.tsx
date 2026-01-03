import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ModalOverlay } from './ModalOverlay.animated';
import { SearchHeader } from './SearchHeader';
import { SearchView } from './SearchView';
import { CharacterDetails } from './CharacterDetails';
import { SubmitBar } from './SubmitBar';
import { type VotedCharacter, type Waifu } from './types';
import { useSearchWaifus } from '../../api/waifus';
import { createVote } from '../../api/votes';
import { authClient } from '../../lib/auth-client';
import { Toast } from '../Toast';

export default function VoteModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [currentCharacter, setCurrentCharacter] = useState<Waifu | null>(null);
    const [votedCharacters, setVotedCharacters] = useState<VotedCharacter[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info'; isVisible: boolean }>({
        message: '',
        type: 'info',
        isVisible: false
    });
    const searchInputRef = useRef<HTMLInputElement>(null);

    const { data: session } = authClient.useSession();

    // Cargar waifus con búsqueda (solo cuando el modal está abierto)
    const { data: waifusData, isLoading } = useSearchWaifus({
        q: debouncedSearch,
        limit: 100,
    }, isOpen);

    const isCharacterVoted = (id: string) => votedCharacters.some(char => char.id === id);

    useEffect(() => {
        if (isOpen && searchInputRef.current) {
            setTimeout(() => searchInputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    // Debounce para búsqueda
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

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
                setDebouncedSearch('');
            }, 300);
        }
    };

    const handleShowDetails = (waifu: Waifu) => {
        setCurrentCharacter(waifu);
        setShowDetails(true);
    };

    const handleBackToSearch = () => {
        setShowDetails(false);
    };

    const handleAddVote = () => {
        if (!currentCharacter || isCharacterVoted(currentCharacter.id)) return;

        setVotedCharacters(prev => [...prev, {
            id: currentCharacter.id,
            name: currentCharacter.name,
            imageUrl: currentCharacter.imageUrl,
            source: currentCharacter.source,
        }]);
    };

    const handleSubmitVotes = async () => {
        if (!session?.user?.id || votedCharacters.length === 0 || isSubmitting) return;

        setIsSubmitting(true);

        try {
            // Enviar cada voto al backend
            const votePromises = votedCharacters.map(character =>
                createVote({
                    userId: session.user.id,
                    waifuId: character.id,
                    value: 1,
                    source: 'normal'
                })
            );

            await Promise.all(votePromises);

            setToast({
                message: `¡${votedCharacters.length} voto${votedCharacters.length > 1 ? 's' : ''} enviado${votedCharacters.length > 1 ? 's' : ''} exitosamente!`,
                type: 'success',
                isVisible: true
            });
            setVotedCharacters([]);
            toggleModal(false);
        } catch (error) {
            console.error('Error al enviar votos:', error);
            setToast({
                message: 'Error al enviar los votos. Intenta nuevamente.',
                type: 'error',
                isVisible: true
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Obtener recomendaciones aleatorias (excluyendo la actual)
    const recommendations = useMemo(() => {
        if (!waifusData?.data || !currentCharacter) return [];
        return waifusData.data
            .filter(w => w.id !== currentCharacter.id)
            .sort(() => Math.random() - 0.5)
            .slice(0, 4);
    }, [waifusData?.data, currentCharacter?.id]);

    return (
        <>
            <Toast
                message={toast.message}
                type={toast.type}
                isVisible={toast.isVisible}
                onClose={() => setToast({ ...toast, isVisible: false })}
            />

            {/* Main Content */}
            <main className="relative z-10 flex flex-col items-center gap-6">
                <motion.button
                    onClick={() => toggleModal(true)}
                    className="group relative px-8 py-3 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-[#bc80ff]/50 transition-all duration-300 overflow-hidden shadow-2xl shadow-black"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#bc80ff]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <div className="flex items-center gap-3 relative z-10">
                        <span className="text-4xl font-primary font-medium tracking-wide">Votar Ahora</span>
                    </div>
                </motion.button>
            </main>

            {/* Modal */}
            <ModalOverlay isOpen={isOpen} onClose={() => toggleModal(false)}>
                <SearchHeader
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    onClose={() => toggleModal(false)}
                    searchInputRef={searchInputRef}
                />

                {!showDetails ? (
                    <SearchView
                        waifus={waifusData?.data || []}
                        isLoading={isLoading}
                        onSelectCharacter={handleShowDetails}
                    />
                ) : currentCharacter ? (
                    <CharacterDetails
                        character={currentCharacter}
                        recommendations={recommendations}
                        isVoted={isCharacterVoted(currentCharacter.id)}
                        votedCount={votedCharacters.length}
                        onVote={handleAddVote}
                        onBack={handleBackToSearch}
                        onSelectRecommendation={handleShowDetails}
                    />
                ) : null}

                <SubmitBar
                    votedCharacters={votedCharacters}
                    isVisible={!showDetails}
                    onSubmit={handleSubmitVotes}
                />
            </ModalOverlay>

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
