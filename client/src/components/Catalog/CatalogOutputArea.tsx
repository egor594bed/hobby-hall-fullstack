import React, { FC, useMemo } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { useHttp } from '../../hooks/http.hook'
import { IProduct } from '../../types/ICatalog'
import Loader from '../Loader/Loader'
import CatalogItem from './CatalogItem'
import CatalogPromoSlider from './CatalogPromoSlider'

interface ICatalogOutputArea {
    activeGoodsList: IProduct[]
    loading: boolean
}

const itemsOnPage = 12

const CatalogOutputArea: FC<ICatalogOutputArea> = ({activeGoodsList, loading}) => {
    const params = useParams()
    const [page, setPage] = useState<number>(1)

    useEffect(() => {
        setPage(1)
    }, [activeGoodsList])

    let visibleItemsArr = useMemo(() => {
        const arr = []
        for (let i = (page - 1)*itemsOnPage; i < page*itemsOnPage; i++) {
            if(activeGoodsList[i] === undefined) break
            arr.push(activeGoodsList[i])
        }
        return arr
    }, [page, activeGoodsList])

    function changePage(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const target = e.target as Element
        const id = Number(target.id)
        setPage(id)
    }

    function pagination() {
        const pages = Math.ceil(activeGoodsList.length/itemsOnPage)
        const pagesElements = []
        console.log(activeGoodsList.length/itemsOnPage)
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

    if(loading) {
        return (
        <div className='catalog__outputArea'>
            <Loader></Loader>
        </div>
        )
    }else if(params.id) {
        return (
            <div className='catalog__outputArea'>
                <Outlet></Outlet>
            </div>
        )
    }

    return (
        <div className='catalog__outputArea' style={(activeGoodsList[0]) ? {} : {padding: 0}}>
                {(activeGoodsList[0])
                    ?
                    <>
                    <div className='catalog__outputArea-items'>
                        {visibleItemsArr.map((elem) => {
                            return <CatalogItem {...elem} key={elem._id}></CatalogItem>
                        })}
                    </div>
                    
                    <div className='catalog__outputArea-pagination'>
                        {(activeGoodsList[0] && 
                            pagination().map((elem) => {
                                return elem
                            })
                        )}
                    </div>
                    </>
                    :
                    <CatalogPromoSlider/>
                }
        </div>
    )
}

export default CatalogOutputArea
