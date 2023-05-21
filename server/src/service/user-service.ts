import uuid from 'uuid'
import bcrypt from 'bcryptjs'
import TokenService from './token-service'
// import sendEmail from '../utils/sendEmail'
import User from '../models/User'
import ActivationLink from '../models/ActivationLink'
import { IUser } from "../types/IUser"

interface IUserService {
    registration(data: IUser): Promise<{ email: string; }>
    login(data: IUser): Promise<{
        userId: string,
        userName: string,
        accessToken: string,
        refreshToken: string 
    }>
}

type token = string
type tokens = {
    accessToken: token
    refreshToken: token
}
interface IPayloadGen {
    email: string
    userId: string
}

interface ITokenService {
    generateTokens(payload: IPayloadGen): tokens
    saveToken(userId: string, refreshToken: string): Promise<token>
    verifyAccessToken(token: token): boolean
    verifyRefreshToken(token: token): boolean
    findToken(token: string): token
    verifyTokens(userId: string, email: string, tokens: tokens): Promise<{
        userId: string;
        token: any;
    } | null>
}

class UserService {
    async registration(userData: IUser) {
        const checkEmail = await User.findOne({ email: userData.email })

        if (checkEmail) {
            throw new Error('Пользователь с таким email уже существует')
        }
        
        const hashedPassword = await bcrypt.hash(userData.password, 5)
        // const activationLink = uuid.v4()
        const user = new User({email: userData.email, password: hashedPassword, name: userData.name, phone: userData.phone})
        const activationLink = new ActivationLink({user: user._id, link: uuid.v4()})
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