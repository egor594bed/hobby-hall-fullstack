import {Router, Request, Response} from 'express'
import Order from '../models/Order'
import User from '../models/User'
const router = Router()

router.post(
    '/newOrder',
    async (req: Request, res: Response) => {
    try {
        const {userId, basketArr, comment, data, delivery, payment, state} = req.body
        const user = await User.findOne({_id: userId})
        user!.password = ""

        //deliveryId и paymentId заменить на название, когда добавлю их в базу???
        const newOrder = {
            user: user,
            productsArr: basketArr,
            clientComment: comment,
            data: data,
            deliveryId: delivery,
            paymentId: payment,
            state: state
        }

        const order = new Order(newOrder)
        await order.save()

        res.status(201).json({message: `Заказ добавлен`})
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так'})
    }
})

router.post(
    '/changeOrder',
    async (req: Request, res: Response) => {
    try {
        const {orderId, state, orderComment} = req.body

        await Order.findOneAndUpdate({_id: orderId}, {
            state: state,
            comment: orderComment
        })

        res.status(201).json({message: `Заказ обновлен`})
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так'})
    }
})

router.get(
    '/getOrderList',
    async (req: Request, res: Response) => {
    try {
        const orederList = await Order.find().lean()

        res.status(201).json(orederList)
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так'})
    }
})


module.exports = router;
