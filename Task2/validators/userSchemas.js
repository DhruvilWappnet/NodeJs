const Joi = require('joi');

const schemas = {
    userRegister: Joi.object().keys({
        id: Joi.number().integer().max(999).required(),
        email: Joi.string().email().required(),
        name: Joi.string().alphanum().min(3).max(50).required(),
        phone: Joi.number().integer().required(),
        status: Joi.string().valid('Active', 'Deleted').required(),
        password: Joi.string().min(6).max(18).required()
    })
}

module.exports = schemas;