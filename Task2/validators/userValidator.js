const Joi = require('joi');

const userValidator = (req, res, next) => {
    const schema = Joi.object({
        id: Joi.number().integer().max(999).required(),
        email: Joi.string().email().required(),
        name: Joi.alphanum().min(5).max(50).required(),
        phone: Joi.number().integer().required(),
        status: Joi.string().valid('Active', 'Deleted').required(),
        password: Joi.string().min(6).max(18).required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    next();
};

module.exports = userValidator;

// const validateId = (userId) => {
//     if (!Number.isInteger(userId) || userId > 1000 || userId <= 0) return false;
//     return true;
// }

// const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.(com|net|org|edu|gov)$/i;
//     return emailRegex.test(email);
// }

// const validateUser = (userData) => {
//     // console.log(userData);
//     if (!validateId(userData.id)) {
//         throw new Error("Invalid Id");
//     }
//     if (!validateEmail(userData.email)) {
//         throw new Error('Invalid email format');
//     }

// }