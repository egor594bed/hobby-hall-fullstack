import React, { FC, useState } from 'react'
import { IOrder } from '../../types/IOrder'
import orderService from '../../service/order-service'
import OrderProduct from './OrderProduct'

interface IOrderItem {
    order: IOrder
}

const OrderItem: FC<IOrderItem> = ({order}) => {
    const [open, setOpen] = useState(false)
    const status = orderService.getStatus(order.status)
    return (
        <ol className='order' onClick={() => setOpen(!open)}>
            <div className='order__header'>
                <p className='order__header-id'>ID заказа: {order._id}</p>
                <p className={`order__header-status order__header-status-${status}`}>{order.status}</p>
            </div>
            <div className={(open) ? 'order__body order__body-open' : 'order__body'}>
                {
                    order.productsArr.map((product) => {
                        return (
                            <OrderProduct product={product}></OrderProduct>
                        )
                    })
                }
                <div className='order__body-client-comment'>
                    <p className='order__body-client-comment-text'>{order.clientComment}</p>
                </div>
            </div>
            <div className='order__footer'>
                <p className='order__footer-data'>{order.date}</p>
            </div>
        </ol>
    )
}

export default OrderItem
