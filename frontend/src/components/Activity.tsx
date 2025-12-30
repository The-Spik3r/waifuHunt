function Activity() {
    return (
        <div className='absolute left-0 my-auto'>
            <h2 className='text-white font-secondary text-3xl mb-2'>Actividad</h2>
            <div className='rounded-3xl p-2 flex gap-4 items-center relative w-[500px]'>
                <div className='relative'>
                    <div className='size-16 rounded-2xl overflow-hidden border-4 border-[#BC80FF]  z-0'>
                        <img
                            src="https://imgs.search.brave.com/kmf_fW-Qwjei4FU2m4eFLgbl65h2TgmKmwsoKsx4LWM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzQxMjI1MzgxL2Mv/MTk0Mi8xOTQyLzAv/MC9pbC8wY2M5Nzgv/NTc0NDE1ODIyOS9p/bF8zMDB4MzAwLjU3/NDQxNTgyMjlfc3My/Yi5qcGc"
                            alt="Nanami"
                            className='w-full h-full object-cover '
                        />
                    </div>
                    <div className='absolute -bottom-3 -right-2 z-10'>
                        <img
                            src="https://imgs.search.brave.com/kmf_fW-Qwjei4FU2m4eFLgbl65h2TgmKmwsoKsx4LWM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzQxMjI1MzgxL2Mv/MTk0Mi8xOTQyLzAv/MC9pbC8wY2M5Nzgv/NTc0NDE1ODIyOS9p/bF8zMDB4MzAwLjU3/NDQxNTgyMjlfc3My/Yi5qcGc"
                            alt="Zero Two"
                            className='size-8 rounded-full border-4 border-black object-cover'
                        />
                    </div>
                </div>
                <div className='flex flex-col gap-2 flex-1'>
                    <h3 className='text-white font-primary text-3xl'>Nanami</h3>
                    <p className='text-white text-lg'>
                        acaba de votar a <span className='text-[#BC80FF] font-semibold'>ZERO TWO</span>
                    </p>
                </div>

            </div>
        </div>
    )
}

export default Activity
