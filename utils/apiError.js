// @desc This class is responsible for handling operational errors
class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    // Maintain proper stack trace (only in V8 engines like Node.js)
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;
