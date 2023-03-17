import React from 'react'

const NewsItem = () => {
    return (
        <div className='news__item'>
            <img className='news__item-img' src={require('../../assets/img/nophoto.jpeg')}></img>
            <p className='news__item-text'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati a incidunt repellendus explicabo vitae quaerat dolore maiores accusantium, aut dolorem voluptates unde? Voluptatem neque quibusdam expedita aliquam animi officiis amet?</p>
            <p className='news__item-date'>05.05.1994</p>
        </div>
    )
}

export default NewsItem
