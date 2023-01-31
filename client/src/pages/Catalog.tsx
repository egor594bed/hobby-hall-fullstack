import React, {useCallback, useEffect, useRef, useState, } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CatalogCategories from '../components/Catalog/CatalogCategories'
import CatalogOutputArea from '../components/Catalog/CatalogOutputArea'
import CatalogSearch from '../components/Catalog/CatalogSearch'
import { IProduct } from '../types/ICatalog'
import { useHttp } from '../hooks/http.hook'

const Catalog = () => {
    const {loading, error, request} = useHttp()
    const [activeGoodsList, setActiveGoodsList] = useState<IProduct[] | []>([])
    const [searchValue, setSearchValue] = useState('');
    const searchDelay = useRef<NodeJS.Timeout | null>(null)
    const params = useParams()
    const navigate = useNavigate()

    const getGoodsId = useCallback((e: React.MouseEvent<HTMLOListElement, MouseEvent>) => {
        const target = e.target as Element
        const id = target.id
        if(params.id) navigate(-1)

        async function getGoods() {
            request(`/api/catalog/getGoodsFromId?id=${id}`)
            .then(response => {
                setActiveGoodsList(response.activeCategoryGoods)
            })
        }
        getGoods()
    }, [params, navigate, request])

    const getSearchedProducts = useCallback((value: string) => {
        if (value.length == 0) {
            setActiveGoodsList([])
            if (searchDelay.current) clearTimeout(searchDelay.current)
        }else {
            if (value.length < 3) return
            if (searchDelay.current) clearTimeout(searchDelay.current)
            searchDelay.current = setTimeout(() => {
                if (params.id) navigate(-1)
                request(`../api/catalog/getGoodsFromSearch?search=${value}`)
                .then(response => {
                    setActiveGoodsList(response.activeCategoryGoods)
                })
            }, 1000)
        }

    }, [navigate, params.id, request])

    return (
        <div className='catalog container'>
            <CatalogCategories getGoodsId={getGoodsId}></CatalogCategories>
            <div className='catalog__rigth'>
                <CatalogSearch getSearchedProducts={getSearchedProducts}></CatalogSearch>
                <CatalogOutputArea activeGoodsList={activeGoodsList} loading={loading}></CatalogOutputArea>
            </div>
        </div>
    )
}

export default Catalog
