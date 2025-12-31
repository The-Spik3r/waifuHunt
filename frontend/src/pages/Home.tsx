import { Notification03Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { authClient } from '@/lib/auth-client'
import Leader from '@/components/leader'
import Activity from '@/components/Activity'

function Home() {
    const { data: session, isPending } = authClient.useSession()

    const displayName = session?.user?.displayUsername || session?.user?.username || 'guest'

    return (
        <div className='bg-black h-full w-full rounded-[40px] p-10'>
            <header className='flex w-full items-start justify-between'>
                <div className='font-primary relative'>
                    <h1 className='text-[90px]'>Our Latest</h1>
                    <div className='bg-primary absolute -right-28'>
                        <h2 className='text-[70px] text-black px-6'>Our Latest</h2>
                    </div>
                </div>
                <div className='flex items-center'>
                    <div className='bg-white p-2 rounded-xl'>
                        <HugeiconsIcon icon={Notification03Icon} color='black' />
                    </div>
                    <div className='p-2'>
                        <div className='relative bg-white text-black p-2 rounded-2xl'>
                            <div className='pr-16'>
                                <h3>{isPending ? 'Loading...' : `Hi! ${displayName}`}</h3>
                            </div>
                            <div className='absolute -right-2 -top-2'>
                                <img src="https://imgs.search.brave.com/kmf_fW-Qwjei4FU2m4eFLgbl65h2TgmKmwsoKsx4LWM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzQxMjI1MzgxL2Mv/MTk0Mi8xOTQyLzAv/MC9pbC8wY2M5Nzgv/NTc0NDE1ODIyOS9p/bF8zMDB4MzAwLjU3/NDQxNTgyMjlfc3My/Yi5qcGc" alt="" className='size-14 rounded-full' />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className='h-32.5'></div>
            <main className='flex flex-col gap-8 h-3/4'>

                <Leader />
                <div className='h-full w-full'>
                    <div className='h-full w-full'>
                        <div className='w-full h-full flex relative justify-center items-center gap-8'>
                            <Activity />
                            <div className='flex-1 flex justify-center items-center'>
                                <button className='px-18 py-2 rounded-3xl bg-black border-4 border-primary font-primary text-7xl'>
                                    Quiero Votar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Home
