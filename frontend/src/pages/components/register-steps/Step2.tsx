import React, { useState } from 'react'
import { motion } from 'framer-motion'
import type { UseFormRegister, FieldErrors } from 'react-hook-form'
import { HugeiconsIcon } from '@hugeicons/react'
import { ViewIcon, ViewOffIcon } from '@hugeicons/core-free-icons'
import type { RegisterFormData } from '../../validation/auth'

interface Step2Props {
    register: UseFormRegister<RegisterFormData>
    errors: FieldErrors<RegisterFormData>
}

export default function Step2({ register, errors }: Step2Props) {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    return (
        <>
            <motion.div
                className='flex flex-col gap-2'
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <label htmlFor="username" className='text-white font-secondary text-2xl'>Username</label>
                <motion.input
                    type="text"
                    id="username"
                    placeholder="username"
                    {...register('username')}
                    className='bg-transparent border-2 border-gray-700 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary transition-colors'
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                />
                {errors.username && (
                    <span className='text-red-500 text-sm font-secondary'>{errors.username.message}</span>
                )}
            </motion.div>

            <motion.div
                className='flex flex-col gap-2'
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <label htmlFor="password" className='text-white font-secondary text-2xl'>Password</label>
                <div className='relative'>
                    <motion.input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="Password"
                        {...register('password')}
                        className='bg-transparent border-2 border-gray-700 rounded-xl px-4 py-3 pr-12 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary transition-colors w-full'
                        whileFocus={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition-colors'
                    >
                        <HugeiconsIcon
                            icon={showPassword ? ViewIcon : ViewOffIcon}
                            size={24}
                        />
                    </button>
                </div>
                {errors.password && (
                    <span className='text-red-500 text-sm font-secondary'>{errors.password.message}</span>
                )}
            </motion.div>

            <motion.div
                className='flex flex-col gap-2'
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                <label htmlFor="confirmPassword" className='text-white font-secondary text-2xl'>Confirmar Contraseña</label>
                <div className='relative'>
                    <motion.input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        placeholder="Confirmar contraseña"
                        {...register('confirmPassword')}
                        className='bg-transparent border-2 border-gray-700 rounded-xl px-4 py-3 pr-12 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary transition-colors w-full'
                        whileFocus={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition-colors'
                    >
                        <HugeiconsIcon
                            icon={showConfirmPassword ? ViewIcon : ViewOffIcon}
                            size={24}
                        />
                    </button>
                </div>
                {errors.confirmPassword && (
                    <span className='text-red-500 text-sm font-secondary'>{errors.confirmPassword.message}</span>
                )}
            </motion.div>
        </>
    )
}
