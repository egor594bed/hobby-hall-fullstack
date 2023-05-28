import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface IAuthSlice {
    isAuthorizated: boolean
    userId: string | null
}
const storageName = 'userData'

const initialState: IAuthSlice = {
    isAuthorizated: false,
    userId: null
}

export const checkAuth = createAsyncThunk(
    'authSlice/checkAuth',
    async () => {
        const data = JSON.parse(localStorage.getItem(storageName)!)
        const headersSettings: any = {}
        headersSettings['Content-Type'] = 'application/json'
        headersSettings['credentials'] = 'same-origin'
        const bodyJSON = JSON.stringify({
            userId: data.userId,
            accessToken: data.token
        })

        try {
            const result =  await fetch('/api/auth/tokenVerification', {
                method: 'POST',
                body: bodyJSON,
                headers: {...headersSettings}
            })
            .then(res => res.json())
            return result
        } catch (e) {
            console.log(e)
            localStorage.removeItem(storageName)
        }

    }
  )

export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        login: (state, data) => {
            state.isAuthorizated = true
            state.userId = data.payload.userId
            localStorage.setItem(storageName, JSON.stringify({userId: data.payload.userId, token: data.payload.token}))
        },
        logout: (state) => {
            state.isAuthorizated = false
            state.userId = null
            localStorage.removeItem(storageName)
        },
    },
    extraReducers: builder => {
        builder.addCase(checkAuth.fulfilled, (state, action) => {
            localStorage.removeItem(storageName)
            if(action.payload == null) {
                state.isAuthorizated = false
                state.userId = null
                return
            }
            localStorage.setItem(storageName, JSON.stringify({userId: action.payload.userId, token: action.payload.token}))
            state.isAuthorizated = true
            state.userId = action.payload.userId
        })
    }
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer