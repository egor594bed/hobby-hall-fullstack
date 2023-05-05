import React from 'react'

const NotFound = () => {
    return (
        <div className='' style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', backgroundColor: 'white', borderRadius: '10px'}}>
            <img style={{width: '100%'}} src={require('../assets/img/404.jpg')}></img>
        </div>
    )
}

export default NotFound
