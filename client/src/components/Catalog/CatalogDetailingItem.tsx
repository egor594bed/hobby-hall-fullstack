import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useHttp } from '../../hooks/http.hook'
import { toBasket } from '../../utils/toBasket'
import Loader from '../Loader/Loader'
import MyButton from '../UI/MyButton/MyButton'
import { IProduct } from '../../types/ICatalog'
import { ToastContext } from '../../context/Toast.context'

const CatalogDetailingItem = () => {
    const params = useParams()
    const {setToast} = useContext(ToastContext)
    const [product, setProduct] = useState<IProduct | null>(null)
    const [onBasket, setOnBasket] = useState(false)
    const {request} = useHttp()
    function noop() {}

    useEffect(() => {
        async function getProduct() {
            await request(`/api/catalog/getProduct?id=${params.id}`)
            .then((data) => setProduct(data.product))
        }
        getProduct()
    }, [params.id, request])

    function addToBasket(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        let target = e.target as HTMLDataElement
        if (typeof(target.dataset.id) === 'string') {
            toBasket(target.dataset.id)
            setOnBasket(!onBasket)
            if(!onBasket) {
                setToast({id: Date.now(), message: `Товар "${product!.name}" добвален в корзину`, type: 'info'})
            }else {
                setToast({id: Date.now(), message: `Товар "${product!.name}" удален из корзины`, type: 'info'})
            }
        }
    }

    useEffect(() => {
        
        if(localStorage.getItem('basket') && product !== null) { 
            let basketStr = localStorage.getItem('basket') as string
            let basketArr = JSON.parse(basketStr)
    
            for (let i = 0; i < basketArr.length; i++) {
                if(basketArr[i][0] === product._id) {
                    setOnBasket(true)
                    break
                }
            }
        }
    }, [product])

    if(product === null) {
        return <Loader></Loader>
    }

    return (
        <div className='catalog__detail'>
            <Link to='../'>Назад</Link>
            <div className='catalog__detail-top'>
                <img className='catalog__detail-top-img' src={
                (product.imgName)
                    ? require(`../../img/goodsImgs/${product.imgName}`)
                    : require(`../../img/goodsImgs/nophoto.jpeg`)
                    }
                alt='photo'></img>
                <div className='catalog__detail-top-side'>
                    <p className='catalog__detail-top-side-title'>{product.name}</p>
                    <p className='catalog__detail-top-side-article'>{product.article}</p>
                    <div className='catalog__detail-top-side-wrapper'>
                        <p className='catalog__detail-top-side-price'>{product.price} р.</p>
                        <MyButton
                        data-id={product._id}
                        onClick={addToBasket}
                        style={{width: '60%'}}
                        >{(onBasket) ? 'Удалить' : 'Добавить в корзину'}</MyButton>
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
