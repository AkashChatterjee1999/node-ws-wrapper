const WsWrapperErrors = require("./errors");

module.exports = {
    secondArgumentCallback: () => WsWrapperErrors.makeError("secondArgument", "The second argument for createServer myst be a callback function only"),

}