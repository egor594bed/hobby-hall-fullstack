import { useState } from 'react'
import { useEffect } from 'react'
import BasketItem from '../components/Basket/BasketItem'
import { useHttp } from '../hooks/http.hook'
import { toBasket } from '../utils/toBasket'
import Loader from '../components/Loader/Loader'
import { useCallback } from 'react'
import MyButton from '../components/UI/MyButton/MyButton'
import { IProduct } from '../types/ICatalog'
import { Link } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { removeProduct, removeAllFromBasket } from '../redux/slices/basket'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import BasketForm from '../components/Basket/BasketForm'

const Basket = () => {
    const isAuthenticated = useSelector((state: RootState) => state.authSlice.isAuthenticated)
    const {request, loading} = useHttp()
    const [updateTotal, setUpdateTotal] = useState(false)
    const [disableButton, setDisableButton] = useState<boolean>(true)
    const [basketArr, setBasketArr] = useState<IProduct[]>([])
    const [total, setTotal] = useState(0)
    const dispatch = useDispatch()


    useEffect(() => {
        const basketStr = localStorage.getItem('basket') as string
        const basketArr = JSON.parse(basketStr)

        request('api/catalog/getBasketGoods', 'POST', basketArr)
        .then(data => {
            for (let i = 0; i < data.basketArr.length; i++) {
                const dataElem = data.basketArr[i]
                for (let j = 0; j < basketArr.length; j++) {
                    if(dataElem._id == basketArr[j][0]) {
                        dataElem.total = basketArr[j][1]
                    }
                }
            }
            setBasketArr(data.basketArr)
            setUpdateTotal(true)
        })
    }, [])

    useEffect(() => {
        setTotal(0)
        for (let i = 0; i < basketArr.length; i++) {
            setTotal(prev => prev + (basketArr[i].total! * basketArr[i].price))
        }
        setUpdateTotal(false)
    }, [updateTotal, basketArr])

    const deleteBasketItems = useCallback(() => {
        localStorage.removeItem('basket')
        setBasketArr([])
        dispatch(removeAllFromBasket())
    }, [])

    const changeTotal = useCallback((id: string, counter: number) => {
        const storageBasketStr = localStorage.getItem('basket') as string
        const storageBasketArr = JSON.parse(storageBasketStr)

        for (let i = 0; i < storageBasketArr.length; i++) {
            if (storageBasketArr[i][0] === id) {
                storageBasketArr[i][1] = counter
                break
            }
            
        }

        localStorage.setItem('basket', JSON.stringify(storageBasketArr))

        for (let i = 0; i < basketArr.length; i++) {
            if (basketArr[i]._id === id) {
                basketArr[i].total = counter
            }
        }
        setBasketArr(basketArr)
        setUpdateTotal(true)

    }, [basketArr])

    //Удаление продукта из локалстареджа
    const deleteProductFromBasket = useCallback((id: string) => {
        toBasket(id)
        const newBasket = basketArr.filter((elem) => {
            if(elem._id !== id) return true
        })
        setBasketArr(newBasket)
        dispatch(removeProduct())
    }, [basketArr])

    //Проверка состояния кнопки 
    useEffect(() => {
        if (basketArr.length > 0) {
            setDisableButton(false)
        }else {
            setDisableButton(true)
        }
    }, [basketArr])

    return (
        <div className='basket'>
            <h1 className='basket__title'>Корзина</h1>
            <div className='basket__item-list'>
                <div className='basket__item-list-header'>
                    <div className='basket__item-list-header-delete'></div>
                    <p>Наименование</p>
                    <div className='basket__item-price-wrapper'>
                        <p>Цена</p>
                        <p>Кол-во</p>
                        <p>Итог</p>
                    </div>
                </div>
                {loading
                    ?
                    <div style={{minHeight:'250px' ,display:'flex', alignItems:'center'}}>
                        <Loader></Loader>  
                    </div>
                    :
                    (basketArr.length > 0)
                        ?
                        <>
                        <TransitionGroup className="basket-items-animate">
                        {basketArr.map((elem) => {
                            return (
                                <CSSTransition
                                key={'animate' + elem._id}
                                timeout={300}
                                classNames="basket-item-animate"
                              >
                                <BasketItem data={elem} deleteProduct={deleteProductFromBasket} key={elem._id} changeTotal={changeTotal}></BasketItem>
                            </CSSTransition>
                            )}
                        )}
                        </TransitionGroup>
                        <div className='basket__item-price-bottom-wrapper'>
                            <MyButton onClick={deleteBasketItems}>Очистить корзину</MyButton>
                            <div className='basket__item-price-total'>
                                <p>Общий итог: <span>{total} р.</span></p>
                            </div>
                        </div>

                        </>
                        :
                        <div className='basket__empty'>
                            <p>В корзине пусто, перейти в <Link to='../'>каталог?</Link></p>
                            <img src={require('../assets/img/empty_basket.png')}></img>
                        </div>  
                }
            </div>
            {isAuthenticated
                ?
                <BasketForm disableButton={disableButton} setBasketArr={setBasketArr} basketArr={basketArr}/>
                :
                <div className='basket__auth'>
                    <p className='basket__auth-title'>Для оформления заказа необходимо войти в систему!</p>
                    <div className='basket__auth-wrapper'>
                        <div className='basket__auth-borders'>
                            <LoginForm></LoginForm>
                        </div>
                        <div className='basket__auth-borders'>
                            <RegisterForm></RegisterForm>
                        </div>
                    </div>
                </div>         
            }
        </div>
    )
}

export default Basket
