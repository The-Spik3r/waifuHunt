import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authClient } from '@/lib/auth-client'

interface ProtectedRouteProps {
    children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { data: session, isPending } = authClient.useSession()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isPending && !session) {
            navigate('/login', { replace: true })
        }
    }, [session, isPending, navigate])

    if (isPending) {
        return (
            <div className='flex w-full h-full items-center justify-center bg-black'>
                <div className='animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full'></div>
            </div>
        )
    }

    if (!session) {
        return null
    }

    return <>{children}</>
}
