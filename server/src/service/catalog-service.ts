import Categories from "../models/Categories"
import Goods from "../models/Goods"
import SubCategories from "../models/SubCategories"
import { ICatalog } from "../types/ICatalog"

class CatalogService {
    async getCatalog() {
        const categories = await Categories.find().lean()
        const sub = await SubCategories.find().lean()
        const marge = [] as ICatalog[]

        categories.map((elem) => {
            let arr = sub.filter(item => item.categoryId.toString() === elem._id.toString())
            marge.push({
                _id: String(elem._id),
                name: elem.name,
                imgSrc: elem.imgSrc,
                subCategories: arr
            })
        })

        return marge
    }

    async getGoodsFromId(id: string) {
        const goodsArr = await Goods.find({subCategoryId: id}).lean()

        return goodsArr
    }

    async getRecommendedItems() {
        const goodsArr = await Goods.find().limit(4).lean()

        return goodsArr
    }

    async getGoodsFromSearch(search: string) {
        const goodsArr = await Goods.find({"name": {$regex: search, $options: "i"}}).lean()

        return goodsArr
    }

    async getProduct(id: string) {
        const product = await Goods.findOne({_id: id}).lean()

        return product
    }

    async getBasketGoods(arr: [_id: string, quantity: number][]) {
        let resArr = []
        for (let i = 0; i < arr.length; i++) {
            const goodsArr = await Goods.find({_id: arr[i][0]}).lean()
            resArr.push(...goodsArr)
        }
        
        return resArr
    }

}

export default new CatalogService()