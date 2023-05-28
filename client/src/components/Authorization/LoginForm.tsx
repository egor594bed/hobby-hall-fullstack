import React, { memo } from 'react'
import { useHttp } from '../../hooks/http.hook'
import MyButton from '../UI/MyButton/MyButton'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/slices/auth'
import { FieldValues, useForm } from 'react-hook-form'
import MyInput from '../UI/MyInput/MyInput'

const LoginForm = memo(() => {
    const dispatch = useDispatch()
    const {request} = useHttp()
    const {
        register,
        formState: {
            errors,
            isValid
        },
        handleSubmit
    } = useForm({
        mode: 'onBlur'
    })

    const loginHandler = async (data: FieldValues) => {
        request('/api/auth/login', 'POST', {...data})
        .then(response => {
            dispatch(login({
                userId: response.userId,
                token: response.token
            })) 
        })
    }

    return (
        <form className='modal-login__form' onSubmit={handleSubmit(loginHandler)}>
            <h3 className='modal-login__form-title'>Войти</h3>
            <MyInput
            name='email'
            label='Email'
            errors={errors}
            register={register}
            validationSchema={{
                required: "Поле обязательно к заполнению",
                pattern: {
                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Неверно введенный email'
                }
            }}
            />
            <MyInput
            name='password'
            label='Пароль'
            errors={errors}
            register={register}
            validationSchema={{
                required: "Поле обязательно к заполнению",
                minLength: {
                    value: 6,
                    message: 'Минимальное количество символов: 6'
                }
            }}
            type='password'
            />
            <MyButton style={{marginTop: "20px"}} disabled={!isValid}>Войти</MyButton>
        </form>
    )
})

export default LoginForm
