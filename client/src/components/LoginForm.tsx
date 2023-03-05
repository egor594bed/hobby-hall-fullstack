import React, { memo, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import MyButton from './UI/MyButton/MyButton'
import MyInput from './UI/MyInput/MyInput'
import { useDispatch } from 'react-redux'
import { login } from '../redux/slices/auth'
import { addToast } from '../redux/slices/toasts' 

const LoginForm = memo(() => {
    const dispatch = useDispatch()
    const {error, clearError, request} = useHttp()
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')

    if(error) {
        dispatch(addToast({id: Date.now(), message: error, type: 'error'}))
        clearError()
    }

    const loginHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        const form = {
            email: emailValue,
            password: passwordValue,
        }

        try {
            await request('/api/auth/login', 'POST', {...form})
            .then(response => {
                dispatch(addToast({id: Date.now(), message: response.message, type: 'success'}))
                dispatch(login({
                    userId: response.userId,
                    token: response.token
                })) 
            })
        } catch (error) {}
    }

    return (
        <form className='modal-login__form'>
            <h3 className='modal-login__form-title'>Войти</h3>
            <MyInput placeholder="E-mail" type='email' name='email' onChange={setEmailValue} value={emailValue}></MyInput>
            <MyInput placeholder="Пароль" type='password' name='password' onChange={setPasswordValue} value={passwordValue}></MyInput>
            <MyButton style={{marginTop: "20px"}} onClick={loginHandler}>Войти</MyButton>
        </form>
    )
})

export default LoginForm
