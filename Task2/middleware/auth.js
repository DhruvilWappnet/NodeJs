const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = "Hello&I#AM%DHRUVIL";

class TokenManager {
    constructor(secretKey) {
        this.secretKey = secretKey;
        this.token = null;
    }
    createToken(data) {
        this.token = jwt.sign(data, this.secretKey, { algorithm: 'HS256', expiresIn: '1h' });
        return this.token;
    }

    getToken() {
        return this.token;
    }
}
const tokenManager = new TokenManager(JWT_SECRET_KEY);

// const createToken = (data) => {
//     tokenManager.createToken(data);
//     return tokenManager.getToken();
// }

// const authenticateUser = (req, res, next) => {
//     try {
//         const token = tokenManager.getToken();
//         const decoded = jwt.verify(token, tokenManager.secretKey);
//         // console.log("Token:"+token);
//         // console.log(decoded);
//         req.body.id = decoded.id;
//         req.body.email = decoded.email;
//         next();
//     } catch (error) {
//         return res.status(401).json({ error: "Invalid or expired token" });
//     }
// }


const createToken = (data) => {
    token = jwt.sign(data, JWT_SECRET_KEY, { expiresIn: '1h' });
    return token;
}

const authenticateUser = (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', "");
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        // console.log(token);
        // console.log(decoded);
        req.body.id = decoded.id;
        req.body.email = decoded.email;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
}

module.exports = {
    createToken,
    authenticateUser
}