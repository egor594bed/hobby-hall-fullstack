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

    // const [emailValue, setEmailValue] = useState('')
    // const [passwordValue, setPasswordValue] = useState('')
    // const [nameValue, setNameValue] = useState('')
    // const [phoneValue, setPhoneValue] = useState('')

    // if(error) {
    //     dispatch(addToast({id: Date.now(), message: error, type: 'error'}))
    //     clearError()
    // }

    const registerHandler = async (data: Object) => {

        // const form = {
        //     email: emailValue,
        //     password: passwordValue,
        //     name: nameValue,
        //     phone: phoneValue
        // }

        try {
            await request('/api/auth/register', 'POST', {...data})
            .then(() => {
                dispatch(addToast({id: Date.now(), message: 'Регистрация прошла успешно!', type: 'success'}))
            })
        } catch (e) {}
    }

    return (
        <form className='modal-login__form' onSubmit={handleSubmit(registerHandler)}>
            <h3 className='modal-login__form-title'>Регистрация</h3>
            <input className={cl.MyInput} {...register('email', {
                required: "Поле обязательно к заполнению",
                validate: (value) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
            })} placeholder={'Введите ваш email'}></input>
            <div className='formErrors'>
                {errors?.email && 
                    <>
                    <img className='formError__img' src={require('../img/formError.png')}></img>
                    <p className='formError__text'>{errors?.email?.message || 'Неверно введенный email'}</p>
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
                    <img className='formError__img' src={require('../img/formError.png')}></img>
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
                    <img className='formError__img' src={require('../img/formError.png')}></img>
                    <p className='formError__text'>{errors?.name?.message || 'Ошибка ввода'}</p>
                    </>
                }
            </div>
            <input className={cl.MyInput} {...register('phone', {
                required: "Поле обязательно к заполнению",
                validate: (value) => /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(value)
            })} placeholder='Введите ваш номер телефона'></input>
            <div className='formErrors'>
                {errors?.phone && 
                    <>
                    <img className='formError__img' src={require('../img/formError.png')}></img>
                    <p className='formError__text'>{errors?.phone?.message || 'Неверно введенный номер'}</p>
                    </>
                }
            </div>

            {/* <MyInput placeholder="E-mail" type='email' name='email' onChange={setEmailValue} value={emailValue}></MyInput>
            <MyInput placeholder="Пароль" type='password' name='password' onChange={setPasswordValue} value={passwordValue}></MyInput>
            <MyInput placeholder="Имя" type='text' name='name' onChange={setNameValue} value={nameValue}></MyInput>
            <MyInput placeholder="Номер телефона" name='phone' type='tel' onChange={setPhoneValue} value={phoneValue}></MyInput> */}
            <MyButton style={{marginTop: "20px"}} disabled={!isValid}>Регистрация</MyButton>
        </form>
    )
})

export default RegisterForm