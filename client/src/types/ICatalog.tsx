export interface ICategory {
    _id: string
    name: string
    subCategories: ISubCategory[]
}

export interface ISubCategory {
    _id: string
    name: string
    categoryId: string
}

export interface IProduct {
    _id: string
    name: string
    price: number
    article: string
    imgSrc?: string
    imgName?: string
    quantity: number
    subCategoryId: string
    description?: string
    colors?: string[]
    total?: number
}