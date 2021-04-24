export default class ResponseError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
    }
}