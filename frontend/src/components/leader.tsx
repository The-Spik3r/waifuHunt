import React, { useState, useRef } from 'react'
import LeaderCard from './LeaderCard'
import WaifuCard from './WaifuCard'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'

interface Waifu {
    id: number
    name: string
    image: string
    description: string
    rank: number
    isLeader?: boolean
}

export default function leader() {
    const [waifus] = useState<Waifu[]>([
        {
            id: 1,
            name: "Zero Two",
            image: "https://imgs.search.brave.com/Ej9od7dn6vDISnTXA1W9KJpbCD1EiOuyIEeBFM4Jff4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nbWFydC5jb20v/ZmlsZXMvMTMvWmVy/by1Ud28tRmFuYXJ0/LVRyYW5zcGFyZW50/LUltYWdlLnBuZw",
            description: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five",
            rank: 1,
            isLeader: true
        },
        {
            id: 2,
            name: "Kurisu",
            image: "https://static.wikia.nocookie.net/steins-gate/images/9/9d/Kurisu_bst.png",
            description: "",
            rank: 2
        },
        {
            id: 3,
            name: "Hori",
            image: "https://imgs.search.brave.com/Ej9od7dn6vDISnTXA1W9KJpbCD1EiOuyIEeBFM4Jff4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nbWFydC5jb20v/ZmlsZXMvMTMvWmVy/by1Ud28tRmFuYXJ0/LVRyYW5zcGFyZW50/LUltYWdlLnBuZw",
            description: "",
            rank: 3
        },
        {
            id: 4,
            name: "Waifu",
            image: "https://imgs.search.brave.com/Ej9od7dn6vDISnTXA1W9KJpbCD1EiOuyIEeBFM4Jff4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nbWFydC5jb20v/ZmlsZXMvMTMvWmVy/by1Ud28tRmFuYXJ0/LVRyYW5zcGFyZW50/LUltYWdlLnBuZw",
            description: "",
            rank: 4
        },
        {
            id: 3,
            name: "Hori",
            image: "https://imgs.search.brave.com/Ej9od7dn6vDISnTXA1W9KJpbCD1EiOuyIEeBFM4Jff4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nbWFydC5jb20v/ZmlsZXMvMTMvWmVy/by1Ud28tRmFuYXJ0/LVRyYW5zcGFyZW50/LUltYWdlLnBuZw",
            description: "",
            rank: 3
        },
        {
            id: 4,
            name: "Waifu",
            image: "https://imgs.search.brave.com/Ej9od7dn6vDISnTXA1W9KJpbCD1EiOuyIEeBFM4Jff4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nbWFydC5jb20v/ZmlsZXMvMTMvWmVy/by1Ud28tRmFuYXJ0/LVRyYW5zcGFyZW50/LUltYWdlLnBuZw",
            description: "",
            rank: 4
        }
    ])

    const swiperRef = useRef<SwiperType | null>(null)
    const leader = waifus.find(w => w.isLeader)
    const topWaifus = waifus.filter(w => !w.isLeader)

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
                        style={{ width: '55%' }}
                    >
                        <LeaderCard
                            name={leader.name}
                            image={leader.image}
                            description={leader.description}
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
                                        image={waifu.image}
                                        rank={waifu.rank}
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
