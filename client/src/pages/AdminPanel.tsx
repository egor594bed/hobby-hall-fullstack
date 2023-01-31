import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavigation from '../components/Admin/AdminNavigation'

const AdminPanel = () => {


    return (
        <div className='admin'>
            <AdminNavigation></AdminNavigation>
            <Outlet></Outlet>
        </div>
    )
}

export default AdminPanel
