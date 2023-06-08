import React, { FC, memo, useCallback, useEffect, useMemo, useRef } from 'react'
import { useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { IProduct } from '../../types/ICatalog'
import Loader from '../Loader/Loader'
import CatalogItem from './CatalogItem'
import CatalogPromoSlider from './CatalogPromoSlider'
import CatalogRecommendedSlider from './CatalogRecommendedSlider'
import { CSSTransition } from 'react-transition-group'
import CatalogSortList from './CatalogSortList'
import MyPagination from '../UI/MyPagination/MyPagination'
import { usePagination } from '../../hooks/pagination.hook'
import CatalogSortService from '../../service/sort/catalog-sort-service'
import SortTypes from '../../types/SortTypes'

interface ICatalogOutputArea {
    goodsList: IProduct[]
    loading: boolean
    openMenu: boolean
}

const CatalogOutputArea: FC<ICatalogOutputArea> = memo(({goodsList, loading, openMenu}) => {
    const nodeRef = useRef(null)
    const params = useParams()
    const [sortType, setSortType] = useState<SortTypes>('stock')
    const {setProductsOnPage, setAllProducts, setActivePage, activePage, pages, activeProducts, allProducts} = usePagination()

    useEffect(() => {
        setAllProducts(goodsList)
    }, [goodsList])

    const sortHandler = useCallback((method: SortTypes) => {
        if(!allProducts) return
        const sortedGoods = CatalogSortService.sortGoods(allProducts, method)
        setSortType(method)
        setAllProducts([...sortedGoods])
    }, [sortType, allProducts])

    useEffect(() => {
        (openMenu) ? setProductsOnPage(12) : setProductsOnPage(15)
    }, [openMenu])

    const changePage = useCallback((activePage: number) => {
        setActivePage(activePage)
        window.scrollTo(0, 0)
    }, [])

    if(params.id) {
        return (
            <div className='catalog__outputArea-wrapper'>
                <div className='catalog__outputArea'>
                    <Outlet></Outlet>
                </div>
                <CatalogRecommendedSlider/>
            </div>
        )
    }

    return (
        <div className='catalog__outputArea-wrapper'>
            <div className='catalog__outputArea' style={(goodsList[0]) ? {} : {padding: 0, overflow: 'hidden'}}>
                {loading &&
                    <Loader></Loader>
                }
                <CSSTransition in={!loading} timeout={300} classNames={'hide-out'} nodeRef={nodeRef}>
                    {(allProducts[0] && !loading)
                        ?
                        <>
                        <CatalogSortList sortType={sortType} setSortType={sortHandler}/>
                        <div className='catalog__outputArea-items' ref={nodeRef}>
                            {activeProducts.map((elem) => (
                                <CatalogItem {...elem} key={elem._id}></CatalogItem>
                            ))}
                        </div>
                        {pages > 1 &&
                        <div className='catalog__outputArea-pagination'>
                            <MyPagination activePage={activePage} setActivePage={changePage} pages={pages}></MyPagination>
                        </div>
                        }
                        </>
                        :
                        <CatalogPromoSlider/>
                    }
                </CSSTransition>
            </div>
        <CatalogRecommendedSlider/>
        </div>
    )
})

export default CatalogOutputArea
