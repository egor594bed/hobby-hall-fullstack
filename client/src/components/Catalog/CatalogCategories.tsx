import React, { FC } from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useHttp } from '../../hooks/http.hook';
import { ICategory } from '../../types/ICatalog';

interface ICatalogCategories {
    getGoodsId: (id: string) => void
    visible: boolean
}

const CatalogCategories: FC<ICatalogCategories> = (props) => {
    const {request} = useHttp()
    const [catalogList, setCatalogList] = useState<ICategory[]>([])
    let [active, setActive] = useState<string | false>(false);


    function isActiveCategory (id: string) {
        if(active === id) {
            setActive(false)
        }else {
            setActive(id)
        }
    }

    useEffect(() => {
        try {
            request('/api/catalog/getCategory', 'GET')
            .then((data => setCatalogList(data.catalog)))
        } catch (error) {}
    }, [])

    return (
        <>
        <div className={(props.visible) ?'catalog__categories catalog__categories--visible' : 'catalog__categories'}>
            <div className='catalog__categories-wrapper'>
            {catalogList.map((elem) => {
                return (
                    <div key={elem.id}>
                        <div className={(active === elem.id) ? 'catalog__categories-subcategories active-category' : 'catalog__categories-subcategories'}
                        onClick={() => isActiveCategory(elem.id)}>
                            {elem.name}
                        </div>
                        <div className='catalog__categories-subcategories-wrapper'>
                            <ul>
                                {elem.subCategories.map((elem) => {
                                    return (
                                    <ol key={elem._id} onClick={() => props.getGoodsId(elem._id)}>
                                        {elem.name}
                                    </ol>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                )
            })}
            </div>
        </div>
        </>
    )
}

export default CatalogCategories
