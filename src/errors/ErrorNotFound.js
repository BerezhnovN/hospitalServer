const {httpStatusCodes} = require('../consts');
const BaseError = require('./BaseError');

class ErrorNotFound extends BaseError {
    constructor(
        name,
        statusCode = httpStatusCodes.NOT_FOUND,
        isOperational = true,
        description = 'Not found',
    ) {
        super(name, statusCode, isOperational, description)
    }
}

module.exports = ErrorNotFound;