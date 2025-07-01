import { useLayoutEffect, useState } from 'react'
import { AuthContext, type AuthState } from './auth-context'
import { SUBDOMAIN_KEY, TOKEN_KEY } from '../constants'
import { useLocation, useNavigate } from 'react-router-dom'
import { getCookie } from '../utils/cookie-utils'

const getInitialValues = (): AuthState => {
    const token = getCookie(TOKEN_KEY)
    const subdomain = getCookie(SUBDOMAIN_KEY)

    if (token && subdomain) {
        return {
            isAuth: true,
            subdomain,
        }
    }

    return {
        isAuth: false,
        subdomain: null,
    }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [value, setValue] = useState<AuthState>(getInitialValues)
    const navigate = useNavigate()
    const pathname = useLocation()

    useLayoutEffect(() => {
        if (!value.isAuth) {
            navigate('/auth')
        } else if (pathname.pathname === '/auth') {
            navigate('/variations')
        }
    }, [value.isAuth])

    return (
        <AuthContext.Provider
            value={{
                ...value,
                setIsAuth: setValue,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
