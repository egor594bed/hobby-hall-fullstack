import {Router, Request, Response} from 'express'
import Order from '../models/Order'
import User from '../models/User'
import OrderService from '../service/order-service'
const router = Router()

router.post(
    '/newOrder',
    async (req: Request, res: Response) => {
    try {
        await OrderService.newOrder(req.body)
        return res.status(201).json({message: `Заказ добавлен`})
    } catch (e) {
        return res.status(500).json({message: 'Что-то пошло не так'})
    }
})

router.patch(
    '/adminUpdateOrder',
    async (req: Request, res: Response) => {
    try {
        await OrderService.adminUpdateOrder(req.body)
        return res.status(201).json({message: `Заказ обновлен`})
    } catch (e) {
        return res.status(500).json({message: 'Что-то пошло не так'})
    }
})

router.get(
    '/getOrderList',
    async (req: Request, res: Response) => {
    try {
        const orderList = await OrderService.getOrderList()
        return res.status(201).json(orderList)
    } catch (e) {
        return res.status(500).json({message: 'Что-то пошло не так'})
    }
})


module.exports = router;
