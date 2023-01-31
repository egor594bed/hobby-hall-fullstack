export function toBasket(id: string) {
    const newProduct = [id, 1]

    if (localStorage.getItem('basket')) {
        let basketStr = localStorage.getItem('basket') as string
        let basketArr = JSON.parse(basketStr)

        let basketMap = new Map(basketArr)

        if (basketMap.has(id)) {
            basketMap.delete(id)
            let newBasketArr = new Array
            basketMap.forEach((value, key) => {
                newBasketArr.push([key, value])
            })
            localStorage.setItem('basket', JSON.stringify(newBasketArr))
        }else {
            localStorage.setItem('basket', JSON.stringify([...basketArr, newProduct]))
        }
    }else{
        localStorage.setItem('basket', JSON.stringify([newProduct]))
    }
}
