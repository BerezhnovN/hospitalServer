const BaseError = require("../errors/BaseError");

const logError = (err) => {
    console.log("GOT ERROR");
    console.error(err)
}

const logErrorMiddleware = (err, req, res, next) => {
        logError(err);
    next(err);
}

const returnError = (err, req, res, next) => {
    res.status(err.statusCode || 500).send(err.name);
        if (!isOperationalError(err)) {
        process.exit(1);
    }
}

const isOperationalError = (error) => {
    if (error instanceof BaseError) {
        return error.isOperational
    }
    return false
}

module.exports = {
    logError,
    logErrorMiddleware,
    returnError,
    isOperationalError
}
