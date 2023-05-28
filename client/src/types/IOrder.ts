import { IProduct } from "./ICatalog"

export interface IOrder {
    _id: string
    userId: string
    date: string
    deliveryId: string
    paymentId: string
    status: string
    clientComment: string
    productsArr: IProduct[]
}