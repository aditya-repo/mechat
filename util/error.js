const schemaError = (error, res) => {
    const errordata = {};
        error.details.forEach((data) => {
            errordata[data.path] = data.message;
        });
        return errordata
}

module.exports = { schemaError }