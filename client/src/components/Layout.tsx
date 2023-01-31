import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import MyToastContainer from './UI/MyToast/MyToastContainer'

const Layout = () => {

    return (
        <>  
            <MyToastContainer/>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </>
    )
}

export default Layout
