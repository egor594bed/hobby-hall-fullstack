import React, { FC } from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useHttp } from '../../hooks/http.hook';
import { ICategory } from '../../types/ICatalog';

interface ICatalogCategories {
    getGoodsId: (e: React.MouseEvent<HTMLOListElement, MouseEvent>) => void
    visible: boolean
}

const CatalogCategories: FC<ICatalogCategories> = (props) => {
    const {request} = useHttp()
    const [catalogList, setCatalogList] = useState<ICategory[]>([])
    let [active, setActive] = useState<string | boolean>(false);


    function isActiveCategory (e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const target = e.target as Element
        const id = target.id
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
                    <div key={elem._id}>
                        <div className={(active === elem._id) ? 'catalog__categories-subcategories active-category' : 'catalog__categories-subcategories'}
                        id={elem._id}
                        onClick={(e) => isActiveCategory(e)}>
                            {elem.name}
                        </div>
                        <div className='catalog__categories-subcategories-wrapper'>
                            <ul>
                                {elem.subCategories.map((elem) => {
                                    return (
                                    <ol id={elem._id} key={elem._id} onClick={(e) => props.getGoodsId(e)}>
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
