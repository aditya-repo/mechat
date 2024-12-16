const { mongoValidator } = require("../util/mongoValidator")

const errorHandler = (err, req, res, next) => {

    // return res.json(err.errors)
    // console.log();
    

    if (err.code === 11000) {
        return res.json({
            message: "Duplicate Key error",
            errors: err.keyValue
        })
    }
    // return res.json(err)
    if (err.name === 'ValidationError') {
        const validationError = mongoValidator(err.errors)
        return res.json(validationError)
    }

    if (err.isOperational) {
        return res.json({
            message: "Something went wrong",
            errors: err.message
        })
    }
    // Handle any unexpected errors
    console.error(err); // 
    return res.status(500).json({
        message: 'Internal Server Error',
        error: err.message || 'An unexpected error occurred'
    });
}

module.exports = errorHandler