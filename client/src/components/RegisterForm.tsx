import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/Auth.context'
import { ToastContext } from '../context/Toast.context'
import { useHttp } from '../hooks/http.hook'
import MyButton from './UI/MyButton/MyButton'
import MyInput from './UI/MyInput/MyInput'

const RegisterForm = () => {
    const {error, clearError, request} = useHttp()
    const {setToast} = useContext(ToastContext)
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [nameValue, setNameValue] = useState('')
    const [phoneValue, setPhoneValue] = useState('')

    if(error) {
        setToast({id: Date.now(), message: error, type: 'error'})
        clearError()
    }

    const registerHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        const form = {
            email: emailValue,
            password: passwordValue,
            name: nameValue,
            phone: phoneValue
        }

        try {
            await request('/api/auth/register', 'POST', {...form})
            .then(() => {
                setToast({id: Date.now(), message: 'Регистрация прошла успешно!', type: 'success'})
            })
        } catch (e) {}
    }

    return (
        <form className='modal-login__form'>
            <h3 className='modal-login__form-title'>Регистрация</h3>
            <MyInput placeholder="E-mail" type='email' name='email' onChange={setEmailValue} value={emailValue}></MyInput>
            <MyInput placeholder="Пароль" type='password' name='password' onChange={setPasswordValue} value={passwordValue}></MyInput>
            <MyInput placeholder="Имя" type='text' name='name' onChange={setNameValue} value={nameValue}></MyInput>
            <MyInput placeholder="Номер телефона" name='phone' type='tel' onChange={setPhoneValue} value={phoneValue}></MyInput>
            <MyButton style={{marginTop: "20px"}} onClick={registerHandler}>Регистрация</MyButton>
        </form>
    )
}

export default RegisterForm