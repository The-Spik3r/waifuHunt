import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { loginUser, registerUser, loginWithDiscord } from '@/api'
import { loginSchema, registerSchema, type LoginFormData, type RegisterFormData } from './validation/auth'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

export default function Login() {
    const [isRegisterMode, setIsRegisterMode] = useState(false)

    const loginForm = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    })

    const registerForm = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema)
    })

    const loginMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            console.log('Login exitoso:', data)
            // Aquí puedes redirigir al usuario o guardar el token
        },
        onError: (error: Error) => {
            console.error('Error al iniciar sesión:', error.message)
        }
    })

    const registerMutation = useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            console.log('Registro exitoso:', data)
            // Cambiar a modo login después de registro exitoso
            setIsRegisterMode(false)
            registerForm.reset()
        },
        onError: (error: Error) => {
            console.error('Error al registrar:', error.message)
        }
    })

    const onLoginSubmit = loginForm.handleSubmit((data) => {
        loginMutation.mutate(data)
    })

    const onRegisterSubmit = registerForm.handleSubmit((data) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { confirmPassword: _confirmPassword, ...registerData } = data
        registerMutation.mutate(registerData)
    })

    const toggleMode = () => {
        setIsRegisterMode(!isRegisterMode)
        loginForm.reset()
        registerForm.reset()
    }

    const handleDiscordLogin = () => {
        loginWithDiscord()
    }

    return (
        <div className='flex w-dvw h-dvh relative'>
            <div className='bg-black w-2/3'></div>
            <div className='bg-secondary w-1/3'></div>
            <div className='absolute w-full h-full py-20'>
                <motion.div
                    className='w-[80%] h-full m-auto  bg-secondary rounded-4xl border-primary border-4'
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <div className='flex justify-between items-start w-full h-full px-10 py-10'>
                        <motion.div
                            className='w-2/4'
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <img src="recta.svg" alt="" />
                        </motion.div>
                        <div className='w-2/4 h-full px-24 py-4 flex flex-col justify-center items-center gap-6'>
                            <motion.div
                                className='w-full text-start'
                                initial={{ y: -30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                <h2 className='text-primary font-primary text-4xl '>ワイフ・ハント</h2>
                                <h1 className='text-white font-secondary text-8xl mb-2'>WaifuHunt</h1>
                                <p className='text-gray-400 font-secondary text-lg'>
                                    {isRegisterMode ? 'Crea tu cuenta' : 'Inicia sesión'}
                                </p>
                            </motion.div>
                            <motion.div
                                className='w-full'
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                {isRegisterMode ? (
                                    <RegisterForm
                                        register={registerForm.register}
                                        errors={registerForm.formState.errors}
                                        onSubmit={onRegisterSubmit}
                                        isPending={registerMutation.isPending}
                                        isError={registerMutation.isError}
                                        isSuccess={registerMutation.isSuccess}
                                        errorMessage={registerMutation.error?.message}
                                    />
                                ) : (
                                    <LoginForm
                                        register={loginForm.register}
                                        errors={loginForm.formState.errors}
                                        onSubmit={onLoginSubmit}
                                        isPending={loginMutation.isPending}
                                        isError={loginMutation.isError}
                                        isSuccess={loginMutation.isSuccess}
                                        errorMessage={loginMutation.error?.message}
                                    />
                                )}

                                <motion.button
                                    type="button"
                                    onClick={toggleMode}
                                    className='text-gray-400 hover:text-primary font-secondary text-lg transition-colors mt-4 w-full'
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.75 }}
                                >
                                    {isRegisterMode ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
                                </motion.button>

                                <motion.div
                                    className='flex items-center gap-4 my-4'
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.8 }}
                                >
                                    <div className='flex-1 h-[2px] bg-gray-700'></div>
                                    <span className='text-gray-500 font-secondary text-xl'>OR</span>
                                    <div className='flex-1 h-[2px] bg-gray-700'></div>
                                </motion.div>

                                <motion.button
                                    type="button"
                                    onClick={handleDiscordLogin}
                                    className='bg-transparent border-2 border-primary hover:bg-primary/10 text-white font-secondary text-2xl py-3 rounded-full transition-colors flex items-center justify-center gap-3 w-full'
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.9 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Login with Discord
                                    <svg className='w-7 h-7' viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                                    </svg>
                                </motion.button>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
