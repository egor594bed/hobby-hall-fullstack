import React from 'react'
import NewsItem from '../components/News/NewsItem'

const News = () => {
    return (
        <div className='news container'>
            <h2 className='news-title'>Новости</h2>
            <NewsItem></NewsItem>
            <NewsItem></NewsItem>
        </div>
    )
}

export default News
