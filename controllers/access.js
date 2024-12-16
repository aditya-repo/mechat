const User = require("../models/user");
const bcrypt = require("bcryptjs")
const signupSchema = require("../validator/signup");
const { schemaError } = require("../util/error");
const SigninValidationSchema = require("../validator/signin");

const signup = async (req, res, next) => {

    try {

        const { name, email, username, password } = req.body

        const { error } = signupSchema.validate({ name, email, username, password }, { abortEarly: false });

        // if (error) {
        //     const err = schemaError(error)
        //     return res.json(err)
        // }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const payload = { name, email, username, password: hashedPassword }

        const user = new User(payload)

        await user.save()
        res.status(200).json({ message: 'user created', payload });

    } catch (error) {
        next(error)
    }


}


const signin = (req, res) => {
    const { email, password } = req.body

    const { error } = SigninValidationSchema.validate({ email, password }, { abortEarly: false })

    console.log(error);

    if (error) {
        const err = schemaError(error)
        return res.json(err)
    }

}


module.exports = { signup, signin }