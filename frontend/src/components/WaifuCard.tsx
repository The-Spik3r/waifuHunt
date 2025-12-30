interface WaifuCardProps {
    name: string
    image: string
    rank: number
}

export default function WaifuCard({ name, image, rank }: WaifuCardProps) {
    return (
        <div className='bg-[#C4C4C4] h-full w-full relative overflow-hidden'>
            <div className='absolute inset-0 flex flex-col justify-start opacity-20 font-primary font-bold text-8xl text-black rotate-[-15deg] select-none pointer-events-none py-8 gap-y-16 -top-12 overflow-hidden'>
                {Array.from({ length: 12 }, (_, i) => (
                    <span key={i} className={`w-full ${i % 2 === 0 ? 'text-end pr-8' : 'text-start pl-8'}`}>
                        {name}
                    </span>
                ))}
            </div>
            <div className='absolute top-4 left-4 font-secondary font-bold text-6xl text-black z-10'>
                #{rank}
            </div>
            <div className='absolute left-0 w-full flex items-end justify-center -bottom-8 z-20'>
                <img src={image} alt={name} className='h-[90%] object-contain drop-shadow-2xl' />
            </div>
        </div>
    )
}
