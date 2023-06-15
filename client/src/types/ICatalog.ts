export interface ICategory {
    _id: string
    name: string
    subCategories: ISubCategory[]
    imgSrc: string
}

export interface ISubCategory {
    _id: string
    name: string
    categoryId: string
    imgSrc: string
}

export interface IProduct {
    _id: string
    name: string
    price: number
    article: string
    imgSrc?: string
    quantity: number
    subCategoryId: string
    description?: string
    colors?: string[]
    total?: number
}