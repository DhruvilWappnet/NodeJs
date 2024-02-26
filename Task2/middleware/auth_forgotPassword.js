const jwt = require('jsonwebtoken');

const JWT_UPDATE_PASS = "My#Name$IS";

const assignToken = (data) => {
    const token = jwt.sign(data, JWT_UPDATE_PASS, { expiresIn: '5min' });
    return token;
}

const authenticateUpdatePassUser = (req, res, next) => {
    try {
        const token = req.query.token;
        const decoded = jwt.verify(token, JWT_UPDATE_PASS);
        req.body.id = decoded.id;
        req.body.email = decoded.email;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid or expired token" });

    }
}

module.exports = { assignToken, authenticateUpdatePassUser };