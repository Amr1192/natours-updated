class appError extends Error {
    constructor(message = "An error happened", statusCode = 500) {
        super(message)
        this.statusCode = statusCode || 500 
    }
}

module.exports = appError