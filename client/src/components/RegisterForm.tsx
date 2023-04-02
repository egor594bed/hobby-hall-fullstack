import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import { useHttp } from '../hooks/http.hook'
import MyButton from './UI/MyButton/MyButton'
import { addToast } from '../redux/slices/toasts'
import { useForm } from 'react-hook-form'
import cl from './UI/MyInput/MyInput.module.scss'

type FormValues = {
    email: string;
    password: string;
    name: string;
    phone: string;
};

const RegisterForm = memo(() => {
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

    const registerHandler = async (data: Object) => {
        try {
            await request('/api/auth/register', 'POST', {...data})
            .then((res) => {
                dispatch(addToast({id: Date.now(), message: res.message, type: 'success'}))
            })
        } catch (e) {}
    }

    return (
        <form className='modal-login__form' onSubmit={handleSubmit(registerHandler)}>
            <h3 className='modal-login__form-title'>Регистрация</h3>
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
            <input className={cl.MyInput} {...register('name', {
                required: "Поле обязательно к заполнению",
            })} placeholder='Введите ваше Имя'></input>
            <div className='formErrors'>
                {errors?.name && 
                    <>
                    <img className='formError__img' src={require('../assets/img/formError.png')}></img>
                    <p className='formError__text'>{errors?.name?.message || 'Ошибка ввода'}</p>
                    </>
                }
            </div>
            <input className={cl.MyInput} {...register('phone', {
                required: "Поле обязательно к заполнению",
                pattern: {
                    value: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
                    message: 'Неверно введенный номер'
                }
            })} placeholder='Введите ваш номер телефона'></input>
            <div className='formErrors'>
                {errors?.phone && 
                    <>
                    <img className='formError__img' src={require('../assets/img/formError.png')}></img>
                    <p className='formError__text'>{errors?.phone?.message || 'Ошибка ввода'}</p>
                    </>
                }
            </div>
            <MyButton style={{marginTop: "20px"}} disabled={!isValid}>Регистрация</MyButton>
        </form>
    )
})

export default RegisterForm