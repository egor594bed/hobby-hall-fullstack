import React, { memo } from 'react'
import { useHttp } from '../hooks/http.hook'
import MyButton from './UI/MyButton/MyButton'
import { useDispatch } from 'react-redux'
import { login } from '../redux/slices/auth'
import { addToast } from '../redux/slices/toasts'
import { useForm } from 'react-hook-form'
import cl from './UI/MyInput/MyInput.module.scss'

type FormValues = {
    email: string;
    password: string;
};
  
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
    } = useForm<FormValues>({
        mode: 'onBlur'
    })

    const loginHandler = async (data: Object) => {
 
        try {
            await request('/api/auth/login', 'POST', {...data})
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
        <form className='modal-login__form' onSubmit={handleSubmit(loginHandler)}>
            <h3 className='modal-login__form-title'>Войти</h3>
            <input className={cl.MyInput} {...register('email', {
                required: "Поле обязательно к заполнению",
                pattern: {
                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Неверно введенный email'
                }
            })} placeholder={'Введите ваш email'}></input>
            <div className='formErrors'>
                {errors?.email && 
                    <>
                    <img className='formError__img' src={require('../assets/img/formError.png')}></img>
                    <p className='formError__text'>{errors?.email?.message || 'Ошибка ввода'}</p>
                    </>
                }
            </div>
            <input className={cl.MyInput} {...register('password', {
                required: "Поле обязательно к заполнению",
                minLength: {
                    value: 6,
                    message: 'Минимальное количество символов: 6'
                }
            })} placeholder='Введите ваш пароль' type='password'></input>
            <div className='formErrors'>
                {errors?.password && 
                    <>
                    <img className='formError__img' src={require('../assets/img/formError.png')}></img>
                    <p className='formError__text'>{errors?.password?.message || 'Ошибка ввода'}</p>
                    </>
                }
            </div>
            <MyButton style={{marginTop: "20px"}} disabled={!isValid}>Войти</MyButton>
        </form>
    )
})

export default LoginForm
