import React, { useEffect, FC } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { useHttp } from '../../hooks/http.hook';
import MyInput from '../UI/MyInput/MyInput';
import MyButton from '../UI/MyButton/MyButton';
import userService from '../../service/user-service';
import Loader from '../Loader/Loader';

interface IPersonalDataForm {
    userData: IUserData | null
}

interface IUserData {
    name: string
    phone: string
    vk: string
    telegram: string
    email: string
}

const PersonalDataForm: FC<IPersonalDataForm> = ({userData}) => {
    const { request, loading } = useHttp()
    const {
        register,
        setValue,
        formState: {
            errors,
            isValid
        },
        handleSubmit
    } = useForm({
        mode: 'onBlur'
    })

    useEffect(() => {
        if(userData) {
            const userDataArr = Object.keys(userData)
            for (let i = 0; i < userDataArr.length; i++) {
                let key = userDataArr[i] as keyof IUserData
                setValue(userDataArr[i], userData[key])
            }
        }
    }, [userData])

    const formSubmit = async (data: FieldValues) => {
        const id = userService.getUserId()
        data['id'] = id
        
        await request('api/user/changeUserPersonalData', 'PATCH', {...data})
    }

    if(loading) {
        return <Loader></Loader>
    }

    return (
        <form className='profile__form' onSubmit={handleSubmit(formSubmit)}>
            <h3 className='profile__form-title'>Изменить личные данные</h3>
            <MyInput
            name='name'
            label='Имя пользователя'
            placeholder="Иванов Иван"
            errors={errors}
            register={register}
            validationSchema={{ 
                minLength: {
                    value: 3,
                    message: "Не меннее 3 символов"
                }
            }}
            />
            <MyInput
            name='phone'
            label='Номер телефона'
            placeholder="89127111111"
            errors={errors}
            register={register}
            validationSchema={{ 
                pattern: {
                    value: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
                    message: 'Неверно введенный номер'
                }
            }}
            />
            <MyInput
            name='vk'
            label='Страница Вконтакте'
            placeholder="vk.com/id1111111"
            errors={errors}
            register={register}
            />
            <MyInput
            name='telegram'
            label='Телеграм'
            placeholder="t.me/ivanovivan"
            errors={errors}
            register={register}
            />
            <MyInput
            name='email'
            label='Электронная почта'
            placeholder="ivan@mail.ru"
            errors={errors}
            register={register}
            validationSchema={{ 
                pattern: {
                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Неверно введенный email'
                }
            }}
            />
            <MyButton disabled={!isValid}>Сохранить изменения</MyButton>
        </form>
    )
}

export default PersonalDataForm
