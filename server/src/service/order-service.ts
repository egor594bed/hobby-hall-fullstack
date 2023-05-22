import { IProduct } from "../types/ICatalog"
import Order from "../models/Order"
import User from "../models/User"

interface IOrder {
    userId: string
    basketArr: IProduct[]
    comment: string
    data: string
    delivery: string
    payment: string
    state: string
}

interface IAdminUpdateOrder {
    orderId: string
    state: string
    orderComment: string
}

class OrderService {
    async newOrder(body: IOrder) {
        const {userId, basketArr, comment, data, delivery, payment, state} = body
        const user = await User.findOne({_id: userId})
        user!.password = ""

        //deliveryId и paymentId заменить на название, когда добавлю их в базу???
        const newOrderBody = {
            user: user,
            productsArr: basketArr,
            clientComment: comment,
            data: data,
            deliveryId: delivery,
            paymentId: payment,
            state: state
        }

        const newOrder = new Order(newOrderBody)
        await newOrder.save()
    }

    async adminUpdateOrder(body: IAdminUpdateOrder) {
        const {orderId, state, orderComment} = body

        await Order.findOneAndUpdate({_id: orderId}, {
            state: state,
            comment: orderComment
        })
    }

    async getOrderList() {
        const orederList = await Order.find().lean()

        return orederList
    }
}

export default new OrderService()