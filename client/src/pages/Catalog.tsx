import React, {useCallback, useRef, useState, } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CatalogCategories from '../components/Catalog/CatalogCategories'
import CatalogOutputArea from '../components/Catalog/CatalogOutputArea'
import CatalogSearch from '../components/Catalog/CatalogSearch'
import { IProduct } from '../types/ICatalog'
import { useHttp } from '../hooks/http.hook'

const Catalog = () => {
    const [openMenu, setOpenMenu] = useState(false)

    const {loading, request} = useHttp()
    const [activeGoodsList, setActiveGoodsList] = useState<IProduct[] | []>([])
    const searchDelay = useRef<NodeJS.Timeout | null>(null)
    const params = useParams()
    const navigate = useNavigate()

    const getGoodsId = useCallback((id: string) => {
        setActiveGoodsList([])
        if(params.id) navigate(-1)
        async function getGoods() {
            request(`/api/catalog/getGoodsFromId?id=${id}`)
            .then(res => {
                setActiveGoodsList([...res.goodsArr])
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
                request(`/api/catalog/getGoodsFromSearch?search=${value}`)
                .then(res => {
                    setActiveGoodsList([...res.goodsArr])
                })
            }, 1000)
        }

    }, [navigate, params.id, request])

    return (
        <div className='catalog'>
            <div className='catalog__wrapper'>
                <div className='catalog__title' onClick={e => setOpenMenu(!openMenu)}>
                    <p>Каталог</p>
                </div>
                <CatalogSearch getSearchedProducts={getSearchedProducts}></CatalogSearch>
            </div>
            <div className='catalog__middle'>
                <CatalogCategories getGoodsId={getGoodsId} visible={openMenu}></CatalogCategories>
                <CatalogOutputArea activeGoodsList={activeGoodsList} loading={loading}></CatalogOutputArea>
            </div>
        </div>
    )
}

export default Catalog
