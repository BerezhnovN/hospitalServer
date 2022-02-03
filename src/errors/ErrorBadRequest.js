const {httpStatusCodes} = require('../consts');
const BaseError = require('./BaseError');

class ErrorBadRequest extends BaseError {
    constructor(
        name,
        statusCode = httpStatusCodes.BAD_REQUEST,
        isOperational = true,
        description = 'Bad request',
    ) {
        super(name, statusCode, isOperational, description)
    }
}

module.exports = ErrorBadRequest;