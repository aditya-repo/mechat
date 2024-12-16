const Joi = require("joi")

const signupSchema = Joi.object({
    name: Joi.string().min(3).required().messages({
        'string.empty': 'Name is required',
        "string.min": "Name must be atleast 3 character"
    }),
    username: Joi.string().min(4).required().messages({
        'string.empty': "Username is required",
        'string.min': "Username must be atleast 3 char long",
        'string.alphanumeric': "Username contains only letter and number"
    }),
    email: Joi.string().min(12).required().email().messages({
        'string.empty': 'Email is required',
        'string.email': 'Email is invalid'
    }),
    password: Joi.string().min(6).required().messages({
        'string.empty': "Password is required",
        'string.min': "Password must be atleast 6 char long"
    })
})

module.exports = signupSchema