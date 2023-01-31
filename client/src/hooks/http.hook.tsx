import { useState, useCallback } from "react"


export const useHttp = () => {
    const backendUrl = 'hobby-hall-backend.onrender.com'
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const request = useCallback(async (url: string, method = 'GET', body: any = null, headers: any = {}) => {
        setLoading(true)
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }
            const response = await fetch(backendUrl + url, {method, body, headers})
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Что-то пошло не так')
            }
            
            setLoading(false)
            return data
        } catch (e: any) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    const clearError = useCallback(() => setError(null), [error, request])


    return { loading, request, error, clearError}
}