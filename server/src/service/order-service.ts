import { IProduct } from "../types/ICatalog"
import Order from "../models/Order"
import User from "../models/User"

interface IOrder {
    userId: string
    basketArr: IProduct[]
    comment: string
    date: string
    delivery: string
    payment: string
    status: string
}

interface IAdminUpdateOrder {
    orderId: string
    status: string
    orderComment: string
}

class OrderService {
    async getUserOrders(id: string) {
        const userOrders = await Order.find({userId: id})

        return userOrders
    }

    async newOrder(body: IOrder) {
        const {userId, basketArr, comment, date, delivery, payment, status} = body
        const user = await User.findOne({_id: userId})

        if(!user) {
            throw new Error('Перезайдите в систему')
        }

        user.password = ""

        //deliveryId и paymentId заменить на название, когда добавлю их в базу???
        const newOrderBody = {
            userId: user._id,
            productsArr: basketArr,
            clientComment: comment,
            date: date,
            deliveryId: delivery,
            paymentId: payment,
            status: status
        }

        const newOrder = new Order(newOrderBody)
        await newOrder.save()
    }

    async adminUpdateOrder(body: IAdminUpdateOrder) {
        const {orderId, status, orderComment} = body

        await Order.findOneAndUpdate({_id: orderId}, {
            status: status,
            comment: orderComment
        })
    }

    async getOrderList() {
        const orederList = await Order.find().lean()

        return orederList
    }
}

export default new OrderService()