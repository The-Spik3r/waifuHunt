import React from 'react'
import { motion } from 'framer-motion'
import type { UseFormRegister, FieldErrors } from 'react-hook-form'
import type { RegisterFormData } from '../../validation/auth'

interface Step1Props {
    register: UseFormRegister<RegisterFormData>
    errors: FieldErrors<RegisterFormData>
}

export default function Step1({ register, errors }: Step1Props) {
    return (
        <>
            <motion.div
                className='flex flex-col gap-2'
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <label htmlFor="name" className='text-white font-secondary text-2xl'>Nombre</label>
                <motion.input
                    type="text"
                    id="name"
                    placeholder="Tu nombre completo"
                    {...register('name')}
                    className='bg-transparent border-2 border-gray-700 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary transition-colors'
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                />
                {errors.name && (
                    <span className='text-red-500 text-sm font-secondary'>{errors.name.message}</span>
                )}
            </motion.div>

            <motion.div
                className='flex flex-col gap-2'
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <label htmlFor="email" className='text-white font-secondary text-2xl'>Email</label>
                <motion.input
                    type="email"
                    id="email"
                    placeholder="tu@email.com"
                    {...register('email')}
                    className='bg-transparent border-2 border-gray-700 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary transition-colors'
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                />
                {errors.email && (
                    <span className='text-red-500 text-sm font-secondary'>{errors.email.message}</span>
                )}
            </motion.div>
        </>
    )
}
