const jwt = require("jsonwebtoken")
require("dotenv").config()

const JWT_TOKEN = process.env.JWT_TOKEN

const authWare = (req, res, next) => {

    const token = req.header('Authorization').replace('Bearer ', '')

    if (!token) {
        return res.status(403).json({ message: 'access denied' })
    }

    try {
        const decoded = jwt.verify(token, JWT_TOKEN)
        res.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ message: 'invalid token' })
    }
}

module.exports = authWare