import React, { useEffect, useState } from 'react'
import { useHttp } from '../../hooks/http.hook'
import userService from '../../service/user-service'
import Loader from '../Loader/Loader'
import OrderItem from './OrderItem'
import { IOrder } from '../../types/IOrder'

const UserProfileOutputOrders = () => {
    const [orderList, setOrderList] = useState<IOrder[]>()
    const { request, loading } = useHttp()

    useEffect(() => {
        const id = userService.getUserId()
        request(`api/user/getUserOrders?id=${id}`, 'GET')
        .then(res => setOrderList(res))
    }, [])

    if(loading) {
        return <Loader></Loader>
    }
    return (
        <ul className='profile__orders'>
            {orderList
                ?
                orderList.map((order) => {
                    return (
                        <OrderItem key={order._id} order={order}></OrderItem>
                    )
                })
                :
                <p>У вас еще не было заказов.</p>
            }
        </ul>
    )
}

export default UserProfileOutputOrders
