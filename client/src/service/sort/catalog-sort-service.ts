import { IProduct } from "../../types/ICatalog";

class CatalogSort {

    sortGoods(goodsArr: IProduct[], method: 'stock' | 'price' | 'alphabet') {
        switch (method) {
            case 'stock': 
                if (goodsArr.length < 2) return goodsArr
                return goodsArr.sort((product) => {
                    if(product.quantity < 1) return 1
                    else return -1
                })

            case 'price': 
                return goodsArr.sort((a, b) => a.price - b.price)

            case 'alphabet': 
                return goodsArr.sort((a, b) => {
                    if (a.name < b.name) {return -1;}
                    if (a.name > b.name) {return 1;}
                    return 0;
                })

            default:
                return goodsArr;
        }
    }
}

export default new CatalogSort()