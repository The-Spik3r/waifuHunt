import React, { useState } from 'react'
import { motion } from 'framer-motion'
import type { UseFormRegister, FieldErrors } from 'react-hook-form'
import { HugeiconsIcon } from '@hugeicons/react'
import { ViewIcon, ViewOffIcon } from '@hugeicons/core-free-icons'
import type { LoginFormData } from '../validation/auth'

interface LoginFormProps {
    register: UseFormRegister<LoginFormData>
    errors: FieldErrors<LoginFormData>
    onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>
    isPending: boolean
    isError: boolean
    isSuccess: boolean
    errorMessage?: string
}

export default function LoginForm({
    register,
    errors,
    onSubmit,
    isPending,
    isError,
    isSuccess,
    errorMessage
}: LoginFormProps) {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <form onSubmit={onSubmit} className='flex flex-col gap-6'>
            <motion.div
                className='flex flex-col gap-2'
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
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
                transition={{ duration: 0.5, delay: 0.6 }}
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

            {isError && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-xl text-sm font-secondary'
                >
                    {errorMessage || 'Error al iniciar sesión'}
                </motion.div>
            )}

            {isSuccess && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='bg-green-500/10 border border-green-500 text-green-500 px-4 py-2 rounded-xl text-sm font-secondary'
                >
                    ¡Login exitoso! Redirigiendo...
                </motion.div>
            )}

            <motion.button
                type="submit"
                disabled={isPending}
                className='bg-primary hover:bg-primary/90 text-black font-secondary text-2xl py-3 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                whileHover={{ scale: isPending ? 1 : 1.05 }}
                whileTap={{ scale: isPending ? 1 : 0.95 }}
            >
                {isPending ? (
                    <span className='flex items-center justify-center gap-2'>
                        <svg className='animate-spin h-5 w-5' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                            <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                            <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                        </svg>
                        Iniciando sesión...
                    </span>
                ) : 'Login'}
            </motion.button>
        </form>
    )
}
