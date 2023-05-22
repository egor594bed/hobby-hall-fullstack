import { IProduct } from "../types/ICatalog"

export class ActiveGoodsService {
    id: number
    itemsOnPage = 12
    goodsArr: IProduct[]
    activeGoodsArr!: IProduct[]

    constructor(array: IProduct[] = [], method: 'stock' | 'price' | 'alphabet', page: number, openMenu: boolean) {
        this.id = Date.now()
        this.goodsArr = array
        this.sortGoods(method)
        this.changeActiveGoods(page, openMenu)
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

    changeActiveGoods(page: number = 1, openMenu: boolean) {
        (!openMenu) ? this.itemsOnPage = 15 : this.itemsOnPage = 12
        let arr = []
        for (let i = (page - 1)*this.itemsOnPage; i < page*this.itemsOnPage; i++) {
            if(this.goodsArr[i] === undefined) break
            arr.push(this.goodsArr[i])
        }

        this.activeGoodsArr = arr
    }
}
