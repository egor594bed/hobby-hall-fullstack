import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useHttp } from '../../hooks/http.hook'
import { IProduct } from '../../types/ICatalog'
import { useFavorite } from '../../hooks/favorite.hook'
import { useBasket } from '../../hooks/basket.hook'
import Loader from '../Loader/Loader'
import MyButton from '../UI/MyButton/MyButton'
import MyFavorite from '../UI/MyFavorite/MyFavorite'

const CatalogDetailingItem = () => {
    const params = useParams()
    const [product, setProduct] = useState<IProduct | null>(null)
    const {isFavorite, favoriteHandler} = useFavorite(product?._id, product?.name)
    const {inBasket, basketHandler} = useBasket(product?._id, product?.name)
    const {request} = useHttp()
    function noop() {}

    useEffect(() => {
        async function getProduct() {
            await request(`/api/catalog/getProduct?id=${params.id}`)
            .then((data) => setProduct(data.product))
        }
        getProduct()
    }, [params.id, request])

    if(product === null) {
        return <Loader></Loader>
    }

    return (
        <div className='catalog__detail'>
            <Link to='../'>Назад</Link>
            <div className='catalog__detail-top'>
                <img className='catalog__detail-top-img' src={`/${product.imgSrc}`}
                onError={(event)=>(event.target as HTMLElement).setAttribute("src",require('../../assets/img/nophoto.jpeg'))}
                alt='photo'></img>
                <div className='catalog__detail-top-side'>
                    <p className='catalog__detail-top-side-title'>{product.name}</p>
                    <p className='catalog__detail-top-side-article'>{product.article}</p>
                    <MyFavorite isFavorite={isFavorite} favoriteHandler={favoriteHandler}></MyFavorite>
                    <div className='catalog__detail-top-side-wrapper'>
                        <p className='catalog__detail-top-side-price'>{product.price} р.</p>
                        {product.quantity < 1
                            ?
                            <MyButton disabled>{'Нет в наличии'}</MyButton>
                            :
                            <MyButton
                            onClick={basketHandler}
                            style={{width: '60%'}}
                            >{(inBasket) ? 'Удалить' : 'Добавить в корзину'}</MyButton>
                        }
                    </div>
                    <Link to='../../basket'><MyButton
                    onClick={noop}
                    style={{width: '100%'}}
                    >Перейти в корзину</MyButton></Link>
                </div>
            </div>
            <div className='catalog__detail-description'>
                    <p className='catalog__detail-description-text'>{(product.description) ? product.description : 'Нет описания'}</p>
            </div>
        </div>
    )
}

export default CatalogDetailingItem
