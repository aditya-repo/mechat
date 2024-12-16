const Joi = require("joi")

const SigninValidationSchema =  Joi.object({
    email: Joi.string().required().email().messages({
        'string.empty': "Email is required",
        'string.email': "Email is not valid"
    }),
    password: Joi.string().min(6).required().messages({
        'string.empty': "Password is requireds",
        'string.min': "Password should atleast 4 char long"
    })
})

module.exports = SigninValidationSchema