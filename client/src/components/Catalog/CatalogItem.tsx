import React, { FC } from 'react'
import {Link} from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import { toBasket } from '../../utils/toBasket'
import MyButton from '../UI/MyButton/MyButton'
import { IProduct } from '../../types/ICatalog'
import { addToast } from '../../redux/slices/toasts'
import { addProduct, removeProduct } from '../../redux/slices/basket'
import { useDispatch } from 'react-redux'

const CatalogItem: FC<IProduct> = (data) => {
    const [onBasket, setOnBasket] = useState(false)
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
                dispatch(addToast({id: Date.now(), message: `Товар "${data.name}" добвален в корзину`, type: 'info'}))
            }else {
                dispatch(removeProduct())
                dispatch(addToast({id: Date.now(), message: `Товар "${data.name}" удален из корзины`, type: 'info'}))
            }
        }
    }

    useEffect(() => {
        if(localStorage.getItem('basket')) {
            let basketStr = localStorage.getItem('basket') as string
            let basketArr = JSON.parse(basketStr)
    
            for (let i = 0; i < basketArr.length; i++) {
                if(basketArr[i][0] === data._id) {
                    setOnBasket(true)
                    break
                }
            }
        }
    }, [data._id])

    return (
        <Link to={`/catalog/product/${data._id}`} onClick={() => window.scrollTo(0, 0)}>
            <div className='catalog__item' id={data._id}>
                <div className='catalog__item-wrapper'>
                    <img className='catalog__item-img' src={`/${data.imgSrc}`}
                    onError={(event)=>(event.target as HTMLElement).setAttribute("src",require('./../../img/nophoto.jpeg'))}
                    alt='photo'></img>
                    <div className='catalog__item-text'>
                        <h2 className='catalog__item-title'>{data.name}</h2>
                        <p className="catalog__item-description">{data.description || 'Нет описания'}</p>
                    </div>
                    <div className='catalog__item-wrapper-bottom'>
                        <h4 className="catalog__item-price">{`${data.price} р.`}</h4>
                        {data.quantity < 1
                            ?
                            <MyButton disabled>{'Нет в наличии'}</MyButton>
                            :
                            <MyButton
                            onClick={addToBasket}
                            data-id={data._id}
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
