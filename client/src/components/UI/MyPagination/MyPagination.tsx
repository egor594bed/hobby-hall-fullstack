import React, { FC } from 'react'

interface IMyPagination {
    activePage: number
    pages: number
    setActivePage: (activePage: number) => void
}

const MyPagination:FC<IMyPagination> = ({activePage, pages, setActivePage}) => {
    let pageButtons = [...new Array(pages)]

    return (
        <>
        {
            pageButtons.map((elem, i) => {
                if(i === 0 || i + 1 === pageButtons.length) {}
                else if(i > activePage + 1 || i + 3 < activePage) return

                return (
                    <div
                        className={(activePage == i + 1) ? 'catalog__outputArea-pagination-btn catalog__outputArea-pagination-btn-active' : 'catalog__outputArea-pagination-btn'}
                        key={i}
                        id={(i + 1).toString()}
                        onClick={e => setActivePage(i + 1)}
                        >
                        {i + 1}
                    </div>
                )
            })
        }
        </>
    )
}

export default MyPagination
