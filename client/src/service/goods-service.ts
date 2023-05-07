import { IProduct } from "../types/ICatalog"

export class GoodsService {
    id: number
    goodsArr: IProduct[]

    constructor(array: IProduct[] = [], method: 'stock' | 'price' | 'alphabet') {
        this.id = Date.now()
        this.goodsArr = array
        this.sortGoods(method)
    }

    sortGoods(method: 'stock' | 'price' | 'alphabet') {
        switch (method) {
            case 'stock': 
                if (this.goodsArr.length < 2) return
                this.goodsArr.sort((product) => {
                    if(product.quantity < 1) return 1
                    else return -1
                })
                break;

            case 'price': 
                this.goodsArr.sort((a, b) => a.price - b.price)
                break;

            case 'alphabet': 
                this.goodsArr.sort((a, b) => {
                    if (a.name < b.name) {return -1;}
                    if (a.name > b.name) {return 1;}
                    return 0;
                })
                break;
            default:
                break;
        }
    }
}
