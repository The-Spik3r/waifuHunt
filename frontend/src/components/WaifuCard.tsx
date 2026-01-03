import { motion } from 'framer-motion'
import { useState } from 'react'

interface WaifuCardProps {
    name: string
    image: string
    rank: number
}

export default function WaifuCard({ name, image, rank }: WaifuCardProps) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <motion.div
            className='bg-[#1c1717] h-full w-full relative overflow-hidden cursor-pointer'
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{
                scale: 1.08,
                zIndex: 50,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
        >
            {/* Background pattern */}
            <div className='absolute inset-0 flex flex-col justify-start opacity-20 font-primary font-bold text-8xl text-primary rotate-[-15deg] select-none pointer-events-none py-8 gap-y-16 -top-12 overflow-hidden'>
                {Array.from({ length: 12 }, (_, i) => (
                    <span key={i} className={`w-full ${i % 2 === 0 ? 'text-end pr-8' : 'text-start pl-8'}`}>
                        {name}
                    </span>
                ))}
            </div>

            {/* Rank badge */}
            <motion.div
                className='absolute top-4 left-4 font-secondary font-bold text-6xl text-primary z-10'
                animate={{
                    scale: isHovered ? 0.8 : 1,
                    x: isHovered ? -5 : 0,
                    y: isHovered ? -5 : 0
                }}
                transition={{ duration: 0.3 }}
            >
                #{rank}
            </motion.div>

            {/* Waifu image */}
            <motion.div
                className='absolute left-0 w-full flex items-end justify-center -bottom-8 z-20'
                animate={{
                    y: isHovered ? -30 : 0,
                    scale: isHovered ? 0.75 : 1
                }}
                transition={{ duration: 0.3 }}
            >
                <img src={image} alt={name} className='h-[90%] object-contain drop-shadow-2xl' />
            </motion.div>

            {/* Hover overlay with info */}
            <motion.div
                className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col justify-end items-center pb-8 px-6 z-30'
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ pointerEvents: isHovered ? 'auto' : 'none' }}
            >
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{
                        y: isHovered ? 0 : 20,
                        opacity: isHovered ? 1 : 0
                    }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className='text-center space-y-2'
                >
                    <h3 className='font-primary font-bold text-3xl text-white leading-tight'>
                        {name}
                    </h3>
                    <div className='flex items-center justify-center gap-3'>
                        <div className='bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full'>
                            <p className='font-secondary text-white text-lg'>
                                Puesto <span className='font-bold'>#{rank}</span>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}
