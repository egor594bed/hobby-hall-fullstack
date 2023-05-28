import React, { FC } from 'react'

interface IError {
    error: {
        message?: string
    } | undefined
}

const MyFormError: FC<IError> = ({error}) => {
    return (
        <div className='formErrors'>
            {error && 
                <>
                <img className='formError__img' src={require('../../../../assets/img/formError.png')}></img>
                <p className='formError__text'>{error.message || 'Ошибка ввода'}</p>
                </>
            }
        </div>
    )
}

export default MyFormError
