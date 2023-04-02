const jwt = require('jsonwebtoken')
const config = require('config')
const Token = require('../models/Token')

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, config.jwtAccess, {expiresIn: '1h'})
        const refreshToken = jwt.sign(payload, config.jwtRefresh, {expiresIn: '30d'})

        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await Token.findOne({user: userId})
        if(tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await Token.create({user: userId, refreshToken})
        return token
    }

    verifyAccessToken(token) {
        const isValidate = jwt.verify(token, config.jwtAccess)

        return isValidate
    }

    verifyRefreshToken(token) {
        const isValidate = jwt.verify(token, config.jwtRefresh)

        return isValidate
    }

    findToken(token) {
        const tokenInDb = Token.findOne({refreshToken: token})

        return tokenInDb
    }

    async verifyTokens(userId, tokens) {
        const accessTokenValid = this.verifyAccessToken(tokens.accessToken)
        if(accessTokenValid) {
            return {
                userId: userId,
                token: tokens.accessToken
            }
        }else {
            const inDb = await this.findToken(tokens.refreshToken)
            if(!inDb) {
                return null
            }
            const refreshTokenValid = this.verifyRefreshToken(tokens.refreshToken)

            if(refreshTokenValid) {
                const accessToken = jwt.sign(payload, config.jwtAccess, {expiresIn: '1h'})
                return {
                    userId,
                    token: accessToken
                }
            }else {
                return null
            }
        }
    }
}

module.exports = new TokenService()