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
}

export default function RegisterForm({
    register,
    errors,
    onSubmit,
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
                        className='flex-1 bg-primary hover:bg-primary/90 text-black font-secondary text-2xl py-3 rounded-full transition-colors'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Registrarse
                    </motion.button>
                )}
            </div>
        </form>
    )
}
