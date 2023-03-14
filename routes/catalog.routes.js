const {Router} = require('express')
const multer = require('multer')
const path = require('path')
const Categories = require('../models/Categories')
const subCategories = require('../models/SubCategories')
const Goods = require('../models/Goods')
const User = require('../models/User')
const { Types } = require('mongoose')
const router = Router()

function sort(productList) {
    if (productList.length < 2) return productList
    productList.sort((a) => {
        if(a.quantity < 1) return 1
        else return -1
    })

    return productList
}

router.get(
    '/getCategory',
    async (req, res) => {
        
    try {
        const catalog = await Categories.find().lean()
        const sub = await subCategories.find().lean()

        catalog.map((elem) => {
            let arr = sub.filter(item => item.categoryId.toString() === elem._id.toString())
            elem["subCategories"] = arr
        })

        return res.status(200).json({catalog: catalog})

    } catch (e) {
        return res.status(500).json({message: 'Что-то пошло не так'})
    }
})

router.get(
    '/getGoodsFromId',
    async (req, res) => {
    try {

        // const goodsArr = await Goods.find({subCategoryId: Types.ObjectId(req.query.id)}).lean()
        // Переделать на нормальный запрос на БД
        const goodsArr = await Goods.find().lean()

        const activeCategoryGoods = goodsArr.filter((item) => item.subCategoryId.toString() == req.query.id)
        const sortedList = sort(activeCategoryGoods)
        return res.status(200).json({activeCategoryGoods: sortedList})
    } catch (e) {
        return res.status(500).json({message: 'Что-то пошло не так'})
    }
})

router.get(
    '/getRecommendedItems',
    async (req, res) => {
    try {
        const goodsArr = await Goods.find().limit(4).lean()

        return res.status(200).json({items: goodsArr})
    } catch (e) {
        return res.status(500).json({message: 'Что-то пошло не так'})
    }
})

router.get(
    '/getGoodsFromSearch',
    async (req, res) => {
    try {
        
        const goodsArr = await Goods.find({"name": {$regex: req.query.search, $options: "i"}}).lean()
        
        const sortedArr = sort(goodsArr)

        return res.status(200).json({activeCategoryGoods: sortedArr})
    } catch (e) {
        return res.status(500).json({message: 'Что-то пошло не так'})
    }
})

router.get(
    '/getProduct',
    async (req, res) => {
    try {

        const product = await Goods.findOne({_id: req.query.id}).lean()

        return res.status(200).json({product: product})
    } catch (e) {
        return res.status(500).json({message: 'Что-то пошло не так'})
    }
})


router.post(
    '/getBasketGoods',
    async (req, res) => {
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

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'assets/goodsImgs')
    },
    filename: function(req, file, cb) {   
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({storage, fileFilter})

router.post(
    '/setProduct',
    [
        upload.single('img')
    ],
    async (req, res) => {
    try {
        let {name, description, price, article, quantity, subCategory} = req.body
        const newProduct = {
            name,
            description,
            price: Number(price),
            article,
            imgSrc: req.file.path,
            quantity: Number(quantity),
            subCategoryId: Types.ObjectId(subCategory)
        }

        const product = new Goods(newProduct)
        await product.save()

        return res.status(201).json({message: `Товар добавлен: ${newProduct.name}`})
    } catch (e) {
        return res.status(500).json({message: 'Что-то пошло не так'})
    }
})

module.exports = router;
