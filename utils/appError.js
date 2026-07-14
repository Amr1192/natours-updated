class AppError extends Error {
    constructor(message = "An error happened", statusCode = 500) {
      super(message);
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
      this.isOperational = true;
    }
  }
  
  module.exports = AppError;