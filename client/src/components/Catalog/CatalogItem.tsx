import React, { FC, useCallback } from 'react'
import {Link} from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import { toBasket } from '../../utils/toBasket'
import MyButton from '../UI/MyButton/MyButton'
import { IProduct } from '../../types/ICatalog'
import { addToast } from '../../redux/slices/toasts'
import { addProduct, removeProduct } from '../../redux/slices/basket'
import { useDispatch } from 'react-redux'
import MyFavorite from '../UI/MyFavorite/MyFavorite'
import favoriteService from '../../service/favorite-service'

const CatalogItem: FC<IProduct> = (productData) => {
    const [onBasket, setOnBasket] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false)
    const dispatch = useDispatch()

    function addToBasket(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault()
        e.stopPropagation()
        let target = e.target as HTMLDataElement
        if (typeof(target.dataset.id) === 'string') {
            toBasket(target.dataset.id)
            setOnBasket(!onBasket)

            if(!onBasket) {
                dispatch(addProduct())
                dispatch(addToast({id: Date.now(), message: `Товар "${productData.name}" добвален в корзину`, type: 'info'}))
            }else {
                dispatch(removeProduct())
                dispatch(addToast({id: Date.now(), message: `Товар "${productData.name}" удален из корзины`, type: 'info'}))
            }
        }
    }

    useEffect(() => {
        if(localStorage.getItem('basket')) {
            let basketStr = localStorage.getItem('basket') as string
            let basketArr = JSON.parse(basketStr)
    
            for (let i = 0; i < basketArr.length; i++) {
                if(basketArr[i][0] === productData._id) {
                    setOnBasket(true)
                    break
                }
            }
        }
        if(localStorage.getItem('favoriteProducts')) {
            setIsFavorite(favoriteService.isFavorite(productData._id))
        }
    }, [productData._id])

    const favoriteHandler = useCallback((e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        e.preventDefault()
        e.stopPropagation()
        favoriteService.toggleFavoriteId(productData._id)
        setIsFavorite(!isFavorite)
    }, [isFavorite])

    return (
        <Link to={`/catalog/product/${productData._id}`} onClick={() => window.scrollTo(0, 0)}>
            <div className='catalog__item' id={productData._id}>
                <div className='catalog__item-wrapper'>
                    <div className='catalog__item-img-wrapper'>
                        <img className='catalog__item-img' src={`/${productData.imgSrc}`}
                        onError={(event)=>(event.target as HTMLElement).setAttribute("src",require('../../assets/img/nophoto.jpeg'))}
                        alt='photo'></img>
                    </div>
                    <MyFavorite favoriteHandler={favoriteHandler} isFavorite={isFavorite}></MyFavorite>
                    <div className='catalog__item-text'>
                        <h2 className='catalog__item-title'>{productData.name}</h2>
                        {
                            productData.description &&
                            <p className="catalog__item-description">{productData.description}</p>
                        }
                    </div>
                    <div className='catalog__item-wrapper-bottom'>
                        <h4 className="catalog__item-price">{`${productData.price} р.`}</h4>
                        {productData.quantity < 1
                            ?
                            <MyButton disabled>{'Нет в наличии'}</MyButton>
                            :
                            <MyButton
                            onClick={addToBasket}
                            data-id={productData._id}
                            style={{width: '50%'}}
                            >{(onBasket) ? 'Удалить' : 'В корзину'}</MyButton>
                        }
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CatalogItem
