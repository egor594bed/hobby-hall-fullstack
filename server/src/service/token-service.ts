import jwt from "jsonwebtoken";
import config from "config";
import Token from "../models/Token";

interface IPayloadGen {
  email: string;
  userId: string;
}

type token = string;
type tokens = {
  accessToken: token;
  refreshToken: token;
};

class TokenService {
  generateTokens(payload: IPayloadGen) {
    const accessToken = jwt.sign(payload, config.get<string>("jwtAccess"), {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(payload, config.get<string>("jwtRefresh"), {
      expiresIn: "30d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId: string, refreshToken: string) {
    const tokenData = await Token.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await Token.create({ user: userId, refreshToken });
    return token;
  }

  verifyAccessToken(token: token) {
    let isValidate;
    jwt.verify(token, config.get<string>("jwtAccess"), (error) => {
      isValidate = error ? false : true;
    });

    return isValidate;
  }

  verifyRefreshToken(token: token) {
    let isValidate;
    jwt.verify(token, config.get<string>("jwtAccess"), (error) => {
      isValidate = error ? false : true;
    });

    return isValidate;
  }

  findToken(token: token) {
    const tokenInDb = Token.findOne({ refreshToken: token });

    return tokenInDb;
  }

  async verifyTokens(userId: string, tokens: tokens) {
    const accessTokenValid = this.verifyAccessToken(tokens.accessToken);
    if (accessTokenValid) {
      return {
        userId: userId,
        token: tokens.accessToken,
      };
    } else {
      const inDb = await this.findToken(tokens.refreshToken);
      if (!inDb) {
        return null;
      }
      const refreshTokenValid = this.verifyRefreshToken(tokens.refreshToken);

      if (refreshTokenValid) {
        const accessToken = jwt.sign(
          { userId },
          config.get<string>("jwtAccess"),
          { expiresIn: "1h" }
        );
        return {
          userId,
          token: accessToken as token,
        };
      } else {
        return null;
      }
    }
  }
}

export default new TokenService();
