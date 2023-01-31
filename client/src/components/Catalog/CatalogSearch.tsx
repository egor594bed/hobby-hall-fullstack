import React, { FC, useState } from 'react'
import { memo } from 'react';

interface catalogSearchProps {
    getSearchedProducts: (e: string) => void
}

const CatalogSearch: FC<catalogSearchProps> = memo(({getSearchedProducts}) => {

    return (
        <div className='catalog__search'>
            <input
            className='catalog__search-input'
            type="text"
            onChange={(e) => getSearchedProducts(e.target.value)}
            placeholder="Поиск"
            />
        </div>
    )
})

export default CatalogSearch
