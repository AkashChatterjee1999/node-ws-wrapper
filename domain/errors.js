
class WsWrapperErrors extends Error {
    constructor(errorName, errorMessage) {
        super(errorMessage);
        this.name = errorName;
        this.message = errorMessage;
        Error.captureStackTrace(this, this.constructor);
    }

    static makeError(name, message) {
        return new WsWrapperErrors(name, message);
    }
}

module.exports = WsWrapperErrors