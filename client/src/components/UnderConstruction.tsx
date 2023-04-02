import React from 'react'

const UnderConstruction = () => {
    return (
        <div className='container' style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', backgroundColor: 'white', padding: '300px 0', borderRadius: '10px'}}>
            <img src={require('../assets/img/dev.jpg')}></img>
        </div>
    )
}

export default UnderConstruction
