import { createContext } from 'react'

export type AuthState = {
    isAuth: boolean
    subdomain: string | null
}

type AuthContextType = AuthState & {
    setIsAuth: ({ isAuth, subdomain }: { isAuth: boolean; subdomain: string }) => void
}

export const AuthContext = createContext<AuthContextType>({
    isAuth: false,
    subdomain: null,
    setIsAuth: () => {},
})
