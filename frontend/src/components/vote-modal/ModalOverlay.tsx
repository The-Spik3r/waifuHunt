import type { ReactNode } from 'react';

interface ModalOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export function ModalOverlay({ isOpen, onClose, children }: ModalOverlayProps) {
    if (!isOpen) return null;

    return (
        <div
            className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'
                }`}
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div
                className={`w-full max-w-2xl bg-black/90 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden transform transition-transform duration-300 flex flex-col max-h-[85vh] relative ${isOpen ? 'scale-100' : 'scale-95'
                    }`}
            >
                {children}
            </div>
        </div>
    );
}
