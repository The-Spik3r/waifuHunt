import React, { useRef } from 'react'
import LeaderCard from './LeaderCard'
import WaifuCard from './WaifuCard'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Swiper as SwiperType } from 'swiper'
import { useLeaderboard } from '../api'
import 'swiper/css'
import 'swiper/css/navigation'

export default function leader() {
    const { data, isLoading, error } = useLeaderboard(10, 0)

    const swiperRef = useRef<SwiperType | null>(null)

    // La primera waifu siempre es el líder (tiene más votos)
    const leader = data?.data[0]
    const topWaifus = data?.data.slice(1) || []

    if (isLoading) {
        return (
            <div className='h-[65%] relative w-full flex items-center justify-center'>
                <div className='text-white text-xl'>Cargando ranking...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className='h-[65%] relative w-full flex items-center justify-center'>
                <div className='text-red-400 text-xl'>Error al cargar el ranking</div>
            </div>
        )
    }

    if (!data || data.data.length === 0) {
        return (
            <div className='h-[65%] relative w-full flex items-center justify-center'>
                <div className='text-white text-xl'>No hay waifus en el ranking</div>
            </div>
        )
    }

    return (
        <div className='h-[65%] relative w-full'>
            {/* Navigation Buttons - Top Right Corner */}
            <div className='absolute -top-14 right-0 z-30 flex gap-2'>
                <motion.button
                    whileHover={{ scale: 1.05, opacity: 0.8 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => swiperRef.current?.slidePrev()}
                    className='bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-colors backdrop-blur-sm'
                >
                    <ChevronLeft className='text-white' size={20} />
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.05, opacity: 0.8 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => swiperRef.current?.slideNext()}
                    className='bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-colors backdrop-blur-sm'
                >
                    <ChevronRight className='text-white' size={20} />
                </motion.button>
            </div>

            <div className='flex gap-10 h-full'>
                {/* Leader Card */}
                {leader && (
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className='shrink-0 h-full'
                        style={{ width: '55%', minHeight: 'calc(65vh - 10.5rem)' }}
                    >
                        <LeaderCard
                            name={leader.name}
                            image={leader.imageUrl}
                            description={leader.description.slice(0,300) || ''}
                        />
                    </motion.div>
                )}

                {/* Swiper Carousel */}
                <div className='flex-1 h-full'>
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={20}
                        slidesPerView={2.7}
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        className='h-full w-180'
                    >
                        {topWaifus.map((waifu, index) => (
                            <SwiperSlide key={waifu.id} className='h-full'>
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className='h-full'
                                >
                                    <WaifuCard
                                        name={waifu.name}
                                        image={waifu.imageUrl}
                                        rank={index + 2}
                                    />
                                </motion.div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    )
}
