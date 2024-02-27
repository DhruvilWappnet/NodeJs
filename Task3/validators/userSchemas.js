const Joi = require('joi');

const schemas = {
    userRegister: Joi.object().keys({
        email: Joi.string().email().required(),
        name: Joi.string().alphanum().min(3).max(50).required(),
        phone: Joi.number().integer().required(),
        status: Joi.string().valid('Active', 'Deleted').required(),
    })
}

module.exports = schemas;