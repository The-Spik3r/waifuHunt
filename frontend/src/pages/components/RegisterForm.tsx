import React, { useState } from 'react'
import { motion } from 'framer-motion'
import type { UseFormRegister, FieldErrors } from 'react-hook-form'
import type { RegisterFormData } from '../validation/auth'
import Step1 from './register-steps/Step1'
import Step2 from './register-steps/Step2'
import StepIndicator from './register-steps/StepIndicator'

interface RegisterFormProps {
    register: UseFormRegister<RegisterFormData>
    errors: FieldErrors<RegisterFormData>
    onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>
    isPending: boolean
    isError: boolean
    isSuccess: boolean
    errorMessage?: string
}

export default function RegisterForm({
    register,
    errors,
    onSubmit,
    isPending,
    isError,
    isSuccess,
    errorMessage
}: RegisterFormProps) {
    const [currentStep, setCurrentStep] = useState(1)
    const totalSteps = 2

    const validateStep1 = () => {
        return !errors.name && !errors.email
    }

    const handleNext = () => {
        if (currentStep === 1 && validateStep1()) {
            setCurrentStep(2)
        }
    }

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    return (
        <form onSubmit={onSubmit} className='flex flex-col gap-6'>
            <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

            {currentStep === 1 && <Step1 register={register} errors={errors} />}
            {currentStep === 2 && <Step2 register={register} errors={errors} />}

            {isError && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-xl text-sm font-secondary'
                >
                    {errorMessage || 'Error al registrar'}
                </motion.div>
            )}

            {isSuccess && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='bg-green-500/10 border border-green-500 text-green-500 px-4 py-2 rounded-xl text-sm font-secondary'
                >
                    ¡Registro exitoso! Ya puedes iniciar sesión
                </motion.div>
            )}

            <div className='flex gap-3'>
                {currentStep > 1 && (
                    <motion.button
                        type="button"
                        onClick={handleBack}
                        className='flex-1 bg-transparent border-2 border-gray-700 hover:border-primary text-white font-secondary text-2xl py-3 rounded-full transition-colors'
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Atrás
                    </motion.button>
                )}

                {currentStep < totalSteps ? (
                    <motion.button
                        type="button"
                        onClick={handleNext}
                        className='flex-1 bg-primary hover:bg-primary/90 text-black font-secondary text-2xl py-3 rounded-full transition-colors'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Siguiente
                    </motion.button>
                ) : (
                    <motion.button
                        type="submit"
                        disabled={isPending}
                        className='flex-1 bg-primary hover:bg-primary/90 text-black font-secondary text-2xl py-3 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        whileHover={{ scale: isPending ? 1 : 1.05 }}
                        whileTap={{ scale: isPending ? 1 : 0.95 }}
                    >
                        {isPending ? (
                            <span className='flex items-center justify-center gap-2'>
                                <svg className='animate-spin h-5 w-5' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                                    <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                                    <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                                </svg>
                                Registrando...
                            </span>
                        ) : 'Registrarse'}
                    </motion.button>
                )}
            </div>
        </form>
    )
}
