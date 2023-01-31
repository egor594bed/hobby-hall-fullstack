import React, { FC, useState } from 'react'
import { useHttp } from '../../hooks/http.hook'
import { IProduct } from '../../types/ICatalog'
import MyButton from '../UI/MyButton/MyButton'

interface IAdminOrderItem {
    _id: string
    user: IUser
    data: string
    productsArr: IProduct[]
    clientComment?: string
    comment: string
    deliveryId: string
    paymentId: string
    state: string
}

interface IUser {
    _id: string
    email: string
    name: string
    phone: string
}

const AdminOrderItem: FC<IAdminOrderItem> = ({...data}) => {
    const [state, setState] = useState(data.state)
    const [comment, setComment] = useState(data.comment)
    const [isHidden, setIsHidden] = useState(true)
    const {request} = useHttp()

    async function changeOrder() {
        try {
            await request('../api/order/changeOrder', 'POST', {
                orderId: data._id,
                state: state,
                orderComment: comment
            })
        } catch (error) {
            
        }
    }
    return (
        <div className='admin-order__order-item'>
            <div className='admin-order__order-personal-data' onClick={() => setIsHidden(!isHidden)}>
                <p>Имя: {data.user.name}</p>
                <p>Телефон: {data.user.phone}</p>
                <p>Почта: {data.user.email}</p>
            </div>
            
            <div className={isHidden ? 'admin-order__order-hidden' : 'admin-order__order-visible'}>
                <div className='admin-order__order-product-list'>
                    <p>Список товаров:</p>
                    {
                        data.productsArr.map((elem) => {
                            return (
                                <div className='admin-order__order-product-item' key={elem._id}>
                                    <p>{elem.name}</p>
                                    <p>{elem.article}</p>
                                    <p>{elem.total} шт.</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='admin-order__order-comments'>
                    <div className='admin-order__order-comment'>
                        <p>Комментарий заказчика:</p>
                        <p>{data.clientComment || "Нет комментария"}</p>
                    </div>
                    <div className='admin-order__order-comment'>
                        <p>Комментарий к заказу:</p>
                        <textarea className='admin-order__order-comment-textarea' defaultValue={comment} onChange={e => setComment(e.target.value)}></textarea>
                    </div>
                </div>
            </div>
            <div className='admin-order__order-control'>
                <select className='admin-order__order-control-select' defaultValue={data.state} onChange={e => setState(e.target.value)}>
                    <option value='Новый'>Новый</option>
                    <option value='Ожидание'>Ожидание</option>
                    <option value='Оплачен'>Оплачен</option>
                    <option value='Отправлен'>Отправлен</option>
                    <option value='Отмена'>Отмена</option>
                </select>
                <MyButton onClick={()=>changeOrder()}>Сохранить изменения</MyButton>
            </div>
            <div className='admin-order__order-bottom-wrapper'>
                <p className='admin-order__order-id'>Id заказа: {data._id}</p>
                <p className='admin-order__order-data'>Дата: {data.data}</p>
            </div>
        </div>
    )
}

export default AdminOrderItem
