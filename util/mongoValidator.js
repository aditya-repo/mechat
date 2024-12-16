const mongoValidator = (validationError)=>{
    const response = {
        message: "Field validation errors",
        errors: [],
    }

    for (const [key, value] of Object.entries(validationError)) {
        const error = {
            field: key,
            error: value.message
        }

        response.errors.push(error)
    }

    return response
}

module.exports = {mongoValidator}