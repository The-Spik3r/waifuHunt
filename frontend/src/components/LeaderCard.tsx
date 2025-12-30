import React from 'react'

interface LeaderCardProps {
    name: string
    image: string
    description: string
}

export default function LeaderCard({ name, image, description }: LeaderCardProps) {
    return (
        <div className='bg-[#BC80FF] h-full w-full relative'>
            {/* Marco decorativo */}
            <div className='absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-black'></div>
            <div className='absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-black'></div>
            <div className='absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-black'></div>
            <div className='absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-black'></div>

            <div className='flex items-center w-full h-full'>
                <div className='w-1/2 h-full flex items-end justify-center bg-gradient-to-r from-white/30 to-transparent'>
                    <img src={image} alt={name} className='h-full object-contain' />
                </div>
                <div className='w-1/2 h-full flex flex-col justify-center px-12 py-8 relative'>
                    <div className='font-secondary mb-6'>
                        <h4 className='text-7xl font-bold italic'>{name}</h4>
                    </div>
                    <div className='text-black'>
                        <p className='leading-relaxed'>{description}</p>
                    </div>
                    <div className='absolute bottom-8 right-8'>
                        <button className='bg-black text-white px-6 py-2 font-secondary font-bold hover:bg-black/80 transition-colors'>
                            SEE MORE
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
