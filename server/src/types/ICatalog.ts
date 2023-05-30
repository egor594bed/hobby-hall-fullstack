export interface ISubCategories {
    name: string
    categoryId: string;
}

export interface ICatalog {
    _id: string
    name: string
    subCategories: ISubCategories[]
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