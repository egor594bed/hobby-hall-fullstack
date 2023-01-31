import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import AdminOrderItem from './AdminOrderItem'
import { IProduct } from '../../types/ICatalog'

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

const AdminOrderList = () => {
    const [orderList, setOrderList] = useState([])
    const sortedList = [...orderList].reverse()
    useEffect(() => {
        try {
            fetch('../api/order/getOrderList')
            .then(data => data.json())
            .then(json => setOrderList(json))
        } catch (error) {}

    }, [])

    // const test = orderList[0]
    // console.log(orderList[0])

    return (
        <div className='admin-order'>
            {orderList[0]
                ?
                sortedList.map((data: IAdminOrderItem) => {
                    return <AdminOrderItem key={data._id} {...data}></AdminOrderItem>
                })
                :
                <Loader></Loader>

            }
        </div>
    )
}

export default AdminOrderList
