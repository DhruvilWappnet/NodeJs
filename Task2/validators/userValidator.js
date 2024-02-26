const Joi = require('joi');


const middleware = (schema, property) => {
    return  (req, res, next) => {
        const { error } = schema.validate(req.body);
        const valid = error == null;
        if (valid) {
            next();
        }
        else {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
    
            console.log("Error:", message);
            res.status(422).json({ error: message });
        }
    }
}

module.exports = middleware;



// const userValidator = (req, res, next) => {
//     const schema = Joi.object().keys({
//         id: Joi.number().integer().max(999).required(),
//         email: Joi.string().email().required(),
//         name: Joi.string().alphanum().min(3).max(50).required(),
//         phone: Joi.number().integer().required(),
//         status: Joi.string().valid('Active', 'Deleted').required(),
//         password: Joi.string().min(6).max(18).required()
//     });

//     const { error, value } = schema.validate(req.body);
//     console.log(error);
//     console.log(value);
//     if (error) {
//         return res.status(422).json({ error: error.details[0].message });
//     }

//     next();
// };


// module.exports = userValidator;






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


// const handler = (req, res, next) = { // handle our request }
// const middleware = (req, res, next) => { // to be defined }
// app.post( '/blog', middleware,middleware, handler )

// middleware -- sh
