import React, { FC, memo, useMemo, useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { IProduct } from '../../types/ICatalog'
import Loader from '../Loader/Loader'
import CatalogItem from './CatalogItem'
import CatalogPromoSlider from './CatalogPromoSlider'
import CatalogRecommendedSlider from './CatalogRecommendedSlider'
import { CSSTransition } from 'react-transition-group'
import { GoodsService } from '../../service/goods-service'

interface ICatalogOutputArea {
    activeGoodsList: IProduct[]
    loading: boolean
}

const itemsOnPage = 12

const CatalogOutputArea: FC<ICatalogOutputArea> = memo(({activeGoodsList, loading}) => {
    const nodeRef = useRef(null)
    const params = useParams()
    const [page, setPage] = useState<number>(1)
    const [sortType, setSortType] = useState<'stock' | 'price' | 'alphabet'>('stock')

    useEffect(() => {
        setPage(1)
    }, [activeGoodsList])

    let goodsServiseList = useMemo(() => {
        let newArr = new GoodsService(activeGoodsList, sortType)
        return newArr
    }, [activeGoodsList])

    let sortedList = useMemo(() => {
        goodsServiseList.sortGoods(sortType)
        return goodsServiseList.goodsArr
    }, [sortType, goodsServiseList.id])

    let visibleItemsArr = useMemo(() => {
        const arr = []
        for (let i = (page - 1)*itemsOnPage; i < page*itemsOnPage; i++) {
            if(sortedList[i] === undefined) break
            arr.push(sortedList[i])
        }
        return arr
    }, [page, sortedList, sortType])

    function changePage(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const target = e.target as Element
        const id = Number(target.id)
        setPage(id)
        window.scrollTo(0, 0)
    }

    function pagination() {
        const pages = Math.ceil(sortedList.length/itemsOnPage)
        if (pages <= 1) return []
        const pagesElements = []
        for (let i = 0; i < pages; i++) {
            pagesElements.push(
                <div
                className={(page == i + 1) ? 'catalog__outputArea-pagination-btn catalog__outputArea-pagination-btn-active' : 'catalog__outputArea-pagination-btn'}
                key={i}
                id={(i + 1).toString()}
                onClick={e => changePage(e)}
                >{i + 1}</div>)
        }
        return pagesElements
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
                        <div className='catalog__outputArea-sort-list'>
                            <img className='catalog__outputArea-sort-list-button' src={require('../../assets/img/sort.png')} alt="sort-img" />
                            <div className='catalog__outputArea-sort-list-wrapper'>
                                <div className='catalog__outputArea-sort-list-item' onClick={() => setSortType('stock')}>
                                    <p className='catalog__outputArea-sort-list-item-text'>По Налачию</p>
                                    {sortType === 'stock' &&
                                        <img className='catalog__outputArea-sort-list-item-check' src={require('../../assets/img/sort-check.png')} alt='V'/>
                                    }
                                </div>
                                <div className='catalog__outputArea-sort-list-item' onClick={() => setSortType('price')}>
                                    <p className='catalog__outputArea-sort-list-item-text'>По Цене</p>
                                    {sortType === 'price' &&
                                        <img className='catalog__outputArea-sort-list-item-check' src={require('../../assets/img/sort-check.png')} alt='V'/>
                                    }
                                </div>
                                <div className='catalog__outputArea-sort-list-item' onClick={() => setSortType('alphabet')}>
                                    <p className='catalog__outputArea-sort-list-item-text'>По Алфавиту</p>
                                    {sortType === 'alphabet' &&
                                        <img className='catalog__outputArea-sort-list-item-check' src={require('../../assets/img/sort-check.png')} alt='V'/>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='catalog__outputArea-items' ref={nodeRef}>
                            {visibleItemsArr.map((elem) => (

                                <CatalogItem {...elem} key={elem._id}></CatalogItem>

                                )
                                )}
                        </div>
                        {pagination().length > 1 &&
                        <div className='catalog__outputArea-pagination'>
                            {
                                pagination().map((elem) => {
                                    return elem
                                })
                            }
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
