import { IProduct } from "../types/ICatalog"

export class ActiveGoodsService {
    itemsOnPage: number
    id: number
    goodsArr: IProduct[]
    activeGoodsArr!: IProduct[]

    constructor(array: IProduct[] = [], method: 'stock' | 'price' | 'alphabet', page: number) {
        this.itemsOnPage = 12
        this.id = Date.now()
        this.goodsArr = array
        this.changeActiveGoods(page)
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

    changeActiveGoods(page: number = 1) {
        let arr = []
        for (let i = (page - 1)*this.itemsOnPage; i < page*this.itemsOnPage; i++) {
            if(this.goodsArr[i] === undefined) break
            arr.push(this.goodsArr[i])
        }

        this.activeGoodsArr = arr
    }
}
