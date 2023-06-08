import { useEffect, useMemo, useState } from "react"
import { IProduct } from "../types/ICatalog"

export const usePagination = () => {
    const [allProducts, setAllProducts] = useState<IProduct[] | []>([])
    const [activePage, setActivePage] = useState(1)
    const [productsOnPage, setProductsOnPage] = useState(12)

    let pages = useMemo(() => {
        if(!allProducts) return 1
        return Math.ceil(allProducts.length/productsOnPage)
    }, [productsOnPage, allProducts])

    let activeProducts = useMemo(() => {
        console.log('test')
        if(!allProducts) return []
        return allProducts.slice(productsOnPage*activePage - productsOnPage, productsOnPage*activePage)
    }, [allProducts, productsOnPage, activePage])

    useEffect(() => {
        if(pages && pages < activePage) setActivePage(pages)
    }, [pages])

    useEffect(() => {
        setActivePage(1)
    }, [allProducts])


    return {
        allProducts,
        activeProducts,
        pages,
        activePage,
        setActivePage,
        setAllProducts,
        setProductsOnPage
    }
}