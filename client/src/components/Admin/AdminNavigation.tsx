import React from 'react'
import { Link } from 'react-router-dom'

const AdminNavigation = () => {
  return (
    <div className='admin__navigation'>
        <Link className='admin__navigation-link' to='/admin/add_product'>Добавить новый товар</Link>
        <Link className='admin__navigation-link' to='/admin/order_list'>Список заказов</Link>
        <Link className='admin__navigation-link' to='/'>Заглушка</Link>
        <Link className='admin__navigation-link' to='/'>Заглушка</Link>
        <Link className='admin__navigation-link' to='/'>Заглушка</Link>
    </div>
  )
}

export default AdminNavigation
