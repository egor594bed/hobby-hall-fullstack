import { createSlice } from '@reduxjs/toolkit'

interface IAuthSlice {
    isAuthenticated: boolean
    userId: string | null
}

const storageName = 'userData'

const initialState: IAuthSlice = getInitAuth()

function getInitAuth() {
    const data = JSON.parse(localStorage.getItem(storageName)!)
    return (data && data.token) ? {
        isAuthenticated: true,
        userId: data
    } : {
        isAuthenticated: false,
        userId: null
    }
}

export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        login: (state, data) => {
            state.isAuthenticated = true
            state.userId = data.payload.userId
            localStorage.setItem(storageName, JSON.stringify({userId: data.payload.userId, token: data.payload.token}))
        },
        logout: (state) => {
            state.isAuthenticated = false
            state.userId = null
            localStorage.removeItem(storageName)
        }
    }
})

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions

export default authSlice.reducer