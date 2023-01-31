import { createContext } from "react";

interface IAuthContext {
    token: string
    userId: string
    login: (jwtToken: string, id: string) => void
    logout: () => void
    isAuthenticated: boolean
}

function noop() {}

export const AuthContext = createContext<IAuthContext>({
    token: '',
    userId: '',
    login: noop,
    logout: noop,
    isAuthenticated: false
})