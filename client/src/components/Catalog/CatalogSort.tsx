import React, { FC, memo } from 'react'

interface ICatalogSort {
    sortType: 'stock' | 'price' | 'alphabet'
    setSortType: React.Dispatch<React.SetStateAction<"stock" | "price" | "alphabet">>
}

const CatalogSort: FC<ICatalogSort> = memo(({sortType, setSortType}) => {


    return (
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
    )
})

export default CatalogSort

