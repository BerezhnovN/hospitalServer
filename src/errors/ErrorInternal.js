const {httpStatusCodes} = require('../consts');
const BaseError = require('./BaseError');

class ErrorInternal extends BaseError {
    constructor(
        name,
        statusCode = httpStatusCodes.INTERNAL_SERVER,
        isOperational = false,
        description = 'Internal error',
    ) {
        super(name, statusCode, isOperational, description)
    }
}

module.exports = ErrorInternal;