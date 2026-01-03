import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';

export interface ToastProps {
    message: string;
    type: 'success' | 'error' | 'info';
    isVisible: boolean;
    onClose: () => void;
    duration?: number;
}

export function Toast({ message, type, isVisible, onClose, duration = 3000 }: ToastProps) {
    useEffect(() => {
        if (isVisible && duration > 0) {
            const timer = setTimeout(onClose, duration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    const variants = {
        hidden: { opacity: 0, y: -50, scale: 0.9 },
        visible: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -20, scale: 0.95 }
    };

    const colors = {
        success: 'from-emerald-500/20 to-emerald-600/20 border-emerald-500/50',
        error: 'from-red-500/20 to-red-600/20 border-red-500/50',
        info: 'from-[#bc80ff]/20 to-purple-600/20 border-[#bc80ff]/50'
    };

    const IconComponent = {
        success: CheckCircle2,
        error: XCircle,
        info: Info
    }[type];

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] pointer-events-auto"
                >
                    <div className={`
            bg-gradient-to-r ${colors[type]}
            backdrop-blur-xl border rounded-2xl
            px-6 py-4 shadow-2xl
            flex items-center gap-4 min-w-[320px] max-w-[500px]
          `}>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1, type: 'spring', damping: 15 }}
                            className={`
                w-10 h-10 rounded-full flex items-center justify-center
                ${type === 'success' ? 'bg-emerald-500 text-white' : ''}
                ${type === 'error' ? 'bg-red-500 text-white' : ''}
                ${type === 'info' ? 'bg-[#bc80ff] text-white' : ''}
              `}
                        >
                            <IconComponent className="w-5 h-5" />
                        </motion.div>

                        <p className="text-white font-medium flex-1">{message}</p>

                        <button
                            onClick={onClose}
                            className="text-zinc-400 hover:text-white transition-colors ml-2"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
