
const {httpStatusCodes} = require('../consts');
const BaseError = require('./BaseError');

class ErrorForbidden extends BaseError {
    constructor(
        name,
        statusCode = httpStatusCodes.FORBIDDEN,
        isOperational = true,
        description = 'Forbidden',
    ) {
        super(name, statusCode, isOperational, description)
    }
}

module.exports = ErrorForbidden;