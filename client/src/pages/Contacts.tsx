import React from 'react'

const Contacts = () => {
    return (
        <div className='contacts container'>
            <div className='contacts__top'>
                <div className='contacts__top-map' style={{width:'50%', height: '300px', backgroundColor:'green'}}></div>
                <div className='contacts__top-detail'>
                    <p className='contacts__top-detail-adress'>"ХОББИ ХОЛЛ" г. Киров, Октябрьский пр-т, 74</p>
                    <ul className='contacts__top-detail-plan'>
                        <ol>График работы:</ol>
                        <ol>пн:  10.00 - 19.00 </ol>
                        <ol>вт:  10.00 - 19.00</ol>
                        <ol>ср:  10.00 - 19.00</ol>
                        <ol>чт:  10.00 - 19.00</ol>
                        <ol>пт:  10.00 - 19.00</ol>
                        <ol>сб:  10.00 - 17.00</ol>
                        <ol>вс:  10.00 - 17.00 </ol>
                    </ul>
                    <p className='contacts__top-detail-tel'>8(8332) 01-01-01, 8-912-01-01-01</p>
                    <p className='contacts__top-detail-text'> ИП Иванов Иван Иванович<br/>
                        ИНН 1111111111<br/>
                        ОГРН 11111111111111111
                    </p>
                </div>
            </div>
            <p className='contacts__text'>Интернет-магазин работает на прием заказов круглосуточно.</p>
            <div className='contacts__social'>
                <a href='mailto:info@hobbyhallshop.ru'>info@hobbyhallshop.ru</a>
                <a href='https://t.me/hobbyhall'>Телеграм @hobbyhallshop</a>
                <a href='https://vk.com/hobby_hall'>Группа Хобби Холл Вконтакте</a>
            </div>
        </div>
    )
}

export default Contacts
