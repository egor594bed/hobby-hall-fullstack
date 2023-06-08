import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addToast } from '../redux/slices/toasts'
import FavoriteService from '../service/favorite-service'

export const useFavorite = (id: string | undefined, productName: string | undefined) => {
    const [isFavorite, setIsFavorite] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if(id && productName) setIsFavorite(FavoriteService.isFavorite(id))
    }, [id])

    const favoriteHandler = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        e.stopPropagation()
        if(!id) return
        FavoriteService.toggleFavoriteId(id)
        setIsFavorite(!isFavorite);
        (!isFavorite) 
            ? dispatch(addToast({id: Date.now(), message: `Товар "${productName}" добвален в избранное`, type: 'info'}))
            : dispatch(addToast({id: Date.now(), message: `Товар "${productName}" удален из избранного`, type: 'info'}))
    }, [id, isFavorite])

    return {
        isFavorite,
        favoriteHandler
    }
}