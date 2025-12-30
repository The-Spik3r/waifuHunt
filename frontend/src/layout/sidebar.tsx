import React from 'react'
import { Outlet } from 'react-router-dom'
import { HugeiconsIcon } from '@hugeicons/react'
import { Home08Icon } from '@hugeicons/core-free-icons'

export default function sidebar() {
    return (
        <div className='bg-[#0E0B14] w-svw h-svh text-white'>
            <div className='w-full flex h-full'>
                <div className='min-w-20 max-w-20 h-full pt-6'>
                    <div className='h-[60%] flex flex-col items-center justify-between w-full'>
                        <div className='flex justify-center'>
                            <p className='font-secondary text-3xl [writing-mode:vertical-rl] [text-orientation:upright]'>
                                ワイフハント
                            </p>
                        </div>
                        <div className='flex justify-center'>
                            <div className='bg-[#BC80FF] p-2 rounded-2xl'>
                                <ul className='flex flex-col items-center gap-4'>
                                    <li>
                                        <div className='bg-white rounded-xl'>
                                            <HugeiconsIcon icon={Home08Icon} color='black' size={40} />
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <HugeiconsIcon icon={Home08Icon} color='white' size={35} />

                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <HugeiconsIcon icon={Home08Icon} color='white' size={35} />
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <HugeiconsIcon icon={Home08Icon} color='white' size={35} />
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <HugeiconsIcon icon={Home08Icon} color='white' size={35} />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full py-3'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
