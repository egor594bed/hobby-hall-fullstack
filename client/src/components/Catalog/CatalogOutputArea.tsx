import React, { FC, memo, useMemo, useRef } from 'react'
import { useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { IProduct } from '../../types/ICatalog'
import Loader from '../Loader/Loader'
import CatalogItem from './CatalogItem'
import CatalogPromoSlider from './CatalogPromoSlider'
import CatalogRecommendedSlider from './CatalogRecommendedSlider'
import { CSSTransition } from 'react-transition-group'
import { ActiveGoodsService } from '../../service/active-goods-service'
import CatalogSort from './CatalogSort'
import MyPagination from '../UI/MyPagination/MyPagination'

interface ICatalogOutputArea {
    activeGoodsList: IProduct[]
    loading: boolean
}

const CatalogOutputArea: FC<ICatalogOutputArea> = memo(({activeGoodsList, loading}) => {
    const nodeRef = useRef(null)
    const params = useParams()
    const [page, setPage] = useState<number>(1)
    const [sortType, setSortType] = useState<'stock' | 'price' | 'alphabet'>('stock')

    let goodsServiseList = useMemo(() => {
        setPage(1)
        let newArr = new ActiveGoodsService(activeGoodsList, sortType, page)
        return newArr
    }, [activeGoodsList])

    let sortedList = useMemo(() => {
        goodsServiseList.sortGoods(sortType)
        return goodsServiseList.goodsArr
    }, [sortType, goodsServiseList.id])

    let visibleItemsArr = useMemo(() => {
        goodsServiseList.changeActiveGoods(page)
        return goodsServiseList.activeGoodsArr
    }, [page, sortedList, sortType])

    let pages = Math.ceil(sortedList.length/goodsServiseList.itemsOnPage)

    function changePage(activePage: number) {
        setPage(activePage)
        window.scrollTo(0, 0)
    }

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
            <div className='catalog__outputArea' style={(activeGoodsList[0]) ? {} : {padding: 0, overflow: 'hidden'}}>
                {loading &&
                    <Loader></Loader>
                }
                <CSSTransition in={!loading} timeout={300} classNames={'hide-out'} nodeRef={nodeRef}>
                    {(activeGoodsList[0] && !loading)
                        ?
                        <>
                        <CatalogSort sortType={sortType} setSortType={setSortType}/>
                        <div className='catalog__outputArea-items' ref={nodeRef}>
                            {visibleItemsArr.map((elem) => (
                                <CatalogItem {...elem} key={elem._id}></CatalogItem>
                            ))}
                        </div>
                        {pages > 1 &&
                        <div className='catalog__outputArea-pagination'>
                            <MyPagination activePage={page} setActivePage={changePage} pages={pages}></MyPagination>
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
