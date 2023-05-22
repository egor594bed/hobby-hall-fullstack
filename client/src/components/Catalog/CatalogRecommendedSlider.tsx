import React, { memo, useEffect, useState } from 'react'
import { useHttp } from '../../hooks/http.hook'
import { IProduct } from '../../types/ICatalog'
import Loader from '../Loader/Loader'
import CatalogRecommendedItem from './CatalogRecommendedItem'

const CatalogRecommendedSlider = memo(() => {
    const {request, loading} = useHttp()
    const [items, setItems] = useState<IProduct[]>()

    useEffect(() => {
        request(window.location.origin + '/api/catalog/getRecommendedItems')
        .then(res => setItems([...res.goodsArr]))
    }, [request])

    if(items === undefined || loading) {
        return <Loader></Loader>
    }

    return (
        <div className='catalog__outputArea-recommended'>
            <h2 className='catalog__outputArea-recommended-title'>Рекомедованые товары</h2>
            <div className='catalog__outputArea-recommended-wrapper'>
            {(items &&
                    items.map((elem: IProduct) => {
                        return <CatalogRecommendedItem {...elem} key={elem._id}/>
                    })    
                )}
            </div>
        </div>


        /* //Ломается откртие каталога
        <Carousel
        // autoplay={false}
        // slidesToShow={4}
        // defaultControlsConfig={{
        //     nextButtonClassName: 'catalog__recommended-slider-next-btn',
        //     prevButtonClassName: 'catalog__recommended-slider-prev-btn',
        //     pagingDotsClassName: 'catalog__recommended-slider-dots',
        // }}
        // // renderCenterLeftControls={({ previousSlide }) => (
        // //     <>{"<"}</>
        // // )}
        // // renderCenterRightControls={({ nextSlide }) => (
        // //     <>{">"}</>
        // // )}
        // renderBottomCenterControls={() => (
        //     <></>
        // )}
        // >
        //     {(items &&
        //         items.map((elem: IProduct) => {
        //             return <CatalogRecommendedItem {...elem} key={elem._id}/>
        //         })    
        //     )}
        // </Carousel> */
    )
})

export default CatalogRecommendedSlider
