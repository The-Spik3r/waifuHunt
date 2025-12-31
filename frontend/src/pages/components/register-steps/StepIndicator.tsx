import React from 'react'
import { motion } from 'framer-motion'

interface StepIndicatorProps {
    currentStep: number
    totalSteps: number
}

export default function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
    return (
        <div className='flex items-center justify-center gap-3 mb-6'>
            {Array.from({ length: totalSteps }).map((_, index) => (
                <React.Fragment key={index}>
                    <motion.div
                        className={`h-2 rounded-full transition-all duration-300 ${index + 1 === currentStep
                                ? 'w-12 bg-primary'
                                : index + 1 < currentStep
                                    ? 'w-8 bg-primary/60'
                                    : 'w-8 bg-gray-700'
                            }`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                    />
                </React.Fragment>
            ))}
        </div>
    )
}
