import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcryptjs'
import TokenService from './token-service'
// import sendEmail from '../utils/sendEmail'
import User from '../models/User'
import ActivationLink from '../models/ActivationLink'
import { IUser } from "../types/IUser"

interface IChangePresonalData {
    id: string
    name: string
    phone: string
    vk: string
    telegram: string
    email: string
}

class UserService {

    async getUserFromId(id: string) {
        const userData = await User.findOne({_id: id})
        if(!userData) {
            throw new Error('Пользователя не существует')
        }

        return userData
    }

    async changeUserPersonalData(data: IChangePresonalData) {
        await User.findOneAndUpdate({_id: data.id}, {
            name: data.name,
            phone: data.phone,
            vk: data.vk,
            telegram: data.telegram,
            email: data.email
        })

        return
    }

    async changeUserPassword(id: string, oldPassword: string, newPassword: string) {
        const user = await User.findOne({_id: id})

        if(!user) {
            throw new Error('Перезайдите в систему')
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password)

        if (!isMatch) {
            throw new Error('Неверный email или пароль')
        }

        const hashedPassword = await bcrypt.hash(newPassword, 5)
        user.password = hashedPassword
        user.save()

        return
    }

    async registration(userData: IUser) {
        const checkEmail = await User.findOne({ email: userData.email })

        if (checkEmail) {
            throw new Error('Пользователь с таким email уже существует')
        }
        
        const hashedPassword = await bcrypt.hash(userData.password, 5)
        const user = new User({email: userData.email, password: hashedPassword, name: userData.name, phone: userData.phone})
        const activationLink = new ActivationLink({user: user._id, link: uuidv4()})
        await user.save()
        await activationLink.save() 
        // Найти нормальную почту с которой можно отправлять письма
        // sendEmail('Регистрация на сайте', [userData.email], `Регистрация на сайте прошла успешно!`)
        return {email: userData.email}
    }
    
    async login(loginData: IUser) {
        const user = await User.findOne({email: loginData.email})

        if (!user) {
            throw new Error('Неверный email или пароль')
        }

        const isMatch = await bcrypt.compare(loginData.password, user.password)

        if (!isMatch) {
            throw new Error('Неверный email или пароль')
        }

        const tokens = await TokenService.generateTokens({email: loginData.email, userId: String(user._id)})
        TokenService.saveToken(String(user._id), tokens.refreshToken)

        return {
            userId: String(user._id),
            userName: user.name,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken
        }
    }
}

export default new UserService()