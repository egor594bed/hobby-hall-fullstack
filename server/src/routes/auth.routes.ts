import {Router, Request, Response} from 'express'
import { check, validationResult} from 'express-validator'
import UserService from '../service/user-service'
import tokenService from '../service/token-service'
const router = Router()


module.exports = router;

router.post(
    '/register',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длинна пароля 6 символов').isLength({min: 6}),
    ],
    async (req: Request, res: Response) => {
    try {
        
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при регистрации'
            })
        }

        const userData = await UserService.registration({...req.body})

        return res.status(201).json({
            message: `Письмо для подтверждения регистрации было отправлено на ${userData.email}`
        })

    } catch (e: any) {
        return res.status(500).json({message: e.message || 'Что-то пошло не так!'})
    }
})

router.post(
    '/login',
    [
        check('email', 'Введите корректный Email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists(),
    ],
    async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при входе в систему'
            })
        }

        const loginData = await UserService.login({...req.body})

        res.cookie('refreshToken', loginData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        return res.status(200).json({token: loginData.accessToken, userId: loginData.userId, message: `Добро пожаловать, ${loginData.userName}!`})

    } catch (e: any) {
        return res.status(500).json({message: e.message || 'Что-то пошло не так!'})
    }
    
})

router.post(
    '/tokenVerification',
    async (req: Request, res: Response) => {
    try {
        const isValidData = await tokenService.verifyTokens(req.body.userId, {
            accessToken: req.body.accessToken,
            refreshToken: req.cookies['refreshToken']
        })
        return res.status(200).json(isValidData)

    } catch (e: any) {
        return res.status(500).json({message: e.message || 'Что-то пошло не так!'})
    }
})
