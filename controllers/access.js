const User = require("../models/user");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const signupSchema = require("../validator/signup");
const { schemaError } = require("../util/error");
const SigninValidationSchema = require("../validator/signin");
require("dotenv").config()

const JWT_TOKEN = process.env.JWT_TOKEN

const signup = async (req, res, next) => {

    try {

        const { name, email, username, password } = req.body

        const { error } = signupSchema.validate({ name, email, username, password }, { abortEarly: false });

        if (error) {
            const err = schemaError(error)
            return res.json(err)
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const payload = { name, email, username, password: hashedPassword }

        const user = new User(payload)
        const response = await user.save()
        const token = jwt.sign({userid: response._id}, JWT_TOKEN, {expiresIn: '10h'})

        res.status(200).json({ message: 'user created', token });

    } catch (error) {
        next(error)
    }
}


const signin = async (req, res, next) => {
    const { email, password } = req.body

    const { error } = SigninValidationSchema.validate({ email, password }, { abortEarly: false })

    if (error) {
        const err = schemaError(error)
        return res.json(err)
    }

    try {
        const user = await User.findOne({email})
        if (!user) {
            return res.status(401).json({message: "email not found"})
        }

        const isMatched = await bcrypt.compare(password, user.password)

        if (!isMatched) {
            return res.status(401).json({message: 'password is incorrect'})
        }

        const token = jwt.sign({userid: user._id}, JWT_TOKEN, {expiresIn: '1h'})

        return res.status(200).json({token: token, userid: user._id})

    } catch (error) {

        next(error)

    }

}


module.exports = { signup, signin }