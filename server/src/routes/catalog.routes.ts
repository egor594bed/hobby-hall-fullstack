import {Router, Request, Response} from 'express'
// import multer from 'multer'
// import path from 'path'
import Categories from '../models/Categories'
import subCategories from '../models/SubCategories'
import Goods from '../models/Goods'
const router = Router()

interface ISubCategories {
    name: string;
    categoryId: string;
}

interface ICatalog {
    name: string
    subCategories: ISubCategories[]
}

router.get(
    '/getCategory',
    async (req: Request, res: Response) => {
        
    try {
        const catalog = await Categories.find().lean()
        const sub = await subCategories.find().lean()
        const marge = [] as ICatalog[]

        catalog.map((elem) => {
            let arr = sub.filter(item => item.categoryId.toString() === elem._id.toString())
            marge.push({
                name: elem.name,
                subCategories: arr
            })
        })

        return res.status(200).json({catalog: marge})

    } catch (e) {
        return res.status(500).json({message: 'Что-то пошло не так'})
    }
})

router.get(
    '/getGoodsFromId',
    async (req: Request, res: Response) => {
    try {

        // const goodsArr = await Goods.find({subCategoryId: Types.ObjectId(req.query.id)}).lean()
        // Переделать на нормальный запрос на БД
        const goodsArr = await Goods.find().lean()

        const activeCategoryGoods = goodsArr.filter((item) => item.subCategoryId.toString() == req.query.id)

        return res.status(200).json({activeCategoryGoods})
    } catch (e) {
        return res.status(500).json({message: 'Что-то пошло не так'})
    }
})

router.get(
    '/getRecommendedItems',
    async (req: Request, res: Response) => {
    try {
        const goodsArr = await Goods.find().limit(4).lean()

        return res.status(200).json({items: goodsArr})
    } catch (e) {
        return res.status(500).json({message: 'Что-то пошло не так'})
    }
})

router.get(
    '/getGoodsFromSearch',
    async (req: Request, res: Response) => {
    try {
        
        const goodsArr = await Goods.find({"name": {$regex: req.query.search, $options: "i"}}).lean()

        return res.status(200).json({activeCategoryGoods: goodsArr})
    } catch (e) {
        return res.status(500).json({message: 'Что-то пошло не так'})
    }
})

router.get(
    '/getProduct',
    async (req: Request, res: Response) => {
    try {

        const product = await Goods.findOne({_id: req.query.id}).lean()

        return res.status(200).json({product: product})
    } catch (e) {
        return res.status(500).json({message: 'Что-то пошло не так'})
    }
})


router.post(
    '/getBasketGoods',
    async (req: Request, res: Response) => {
    try {
        let resArr = []
        for (let i = 0; i < req.body.length; i++) {
            const goodsArr = await Goods.find({_id: req.body[i][0]}).lean()
            resArr.push(...goodsArr)
        }

        return res.status(200).json({basketArr: resArr})
    } catch (e) {
        return res.status(500).json({message: 'Что-то пошло не так'})
    }
})

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, 'assets/goodsImgs')
//     },
//     filename: function(req, file, cb) {   
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// })

// const fileFilter = (req, file, cb) => {
//     const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
//     if(allowedFileTypes.includes(file.mimetype)) {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// }

// let upload = multer({storage, fileFilter})

// router.post(
//     '/setProduct',
//     [
//         upload.single('img')
//     ],
//     async (req: Request, res: Response) => {
//     try {
//         let {name, description, price, article, quantity, subCategory} = req.body
//         const newProduct = {
//             name,
//             description,
//             price: Number(price),
//             article,
//             imgSrc: req.file.path,
//             quantity: Number(quantity),
//             subCategoryId: Types.ObjectId(subCategory)
//         }

//         const product = new Goods(newProduct)
//         await product.save()

//         return res.status(201).json({message: `Товар добавлен: ${newProduct.name}`})
//     } catch (e) {
//         return res.status(500).json({message: 'Что-то пошло не так'})
//     }
// })

module.exports = router;
