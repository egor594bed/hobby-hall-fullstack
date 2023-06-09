const storageName = 'basket'

class BasketService {

    getBasketItems() {
        if(!localStorage.getItem(storageName)) localStorage.setItem(storageName, '[]')
        return JSON.parse(localStorage.getItem(storageName) as string)
    }
    
    toggleBasketItem(id: string) {
        let basketArr =  this.getBasketItems()

        for(let i = 0; i < basketArr.length; i++) {
            if(basketArr[i].includes(id)) {
                this.removeBasketItem(id)
                return
            }
        }
        this.addBasketItem(id)
    }

    inBasket(id: string) {
        const basketArr = this.getBasketItems()
        if(!basketArr) return false
        for(let i = 0; i < basketArr.length; i++) {
            if(basketArr[i].includes(id)) return true
        }

        return false
    }

    changeBasketItemTotal(id: string, total: number) {
        const basketArr = this.getBasketItems()

        for(let i = 0; i < basketArr.length; i++) {
            if(basketArr[i][0] === id) {
                basketArr[i][1] = total
            }
        }

        this.saveBasketItems(basketArr)
    }

    private removeBasketItem(id: string) {
        let basketArr =  this.getBasketItems()

        let newBasketArr = basketArr.filter((elem: string) => {
            if(elem[0] === id) return false
            return true
        })

        this.saveBasketItems(newBasketArr)
    }

    private addBasketItem(id: string) {
        let basketArr =  this.getBasketItems()

        basketArr.push([id, 1])
        this.saveBasketItems(basketArr)
    }

    private saveBasketItems(newBasketArr: [string[]]) {
        localStorage.setItem(storageName, JSON.stringify(newBasketArr))
    }
}

export default new BasketService()