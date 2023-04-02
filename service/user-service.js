const User = require('../models/User')
const uuid = require('uuid')
const bcrypt = require('bcryptjs')
const TokenService = require('./token-service')
const sendEmail = require('../utils/sendEmail')
const ActivationLink = require('../models/ActivationLink')

class UserService {
    async registration(userData) {
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
    
    async login(loginData) {

        const user = await User.findOne({email: loginData.email})

        if (!user) {
            throw new Error('Неверный email или пароль')
        }

        const isMatch = await bcrypt.compare(loginData.password, user.password)

        if (!isMatch) {
            throw new Error('Неверный email или пароль')
        }

        const tokens = await TokenService.generateTokens({email: loginData.email, userId: user._id})
        TokenService.saveToken(user._id, tokens.refreshToken)

        return {
            userId: user._id,
            userName: user.name,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken
        }

    }
}

module.exports = new UserService()