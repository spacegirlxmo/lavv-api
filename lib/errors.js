class HttpError extends Error {
    constructor(message = 'Unknown error') {
        super(message)

        this.name = 'HttpError'
        this.statusCode = 500
    }
}

class NotFoundError extends HttpError {
    constructor(message = 'Not found') {
        super(message)

        this.name = 'NotFoundError'
        this.statusCode = 404
    }
}

class ForbiddenError extends HttpError {
    constructor(message = 'Forbidden') {
        super(message)

        this.name = 'ForbiddenError'
        this.statusCode = 403
    }
}

class UnauthorizedError extends HttpError {
    constructor(message = 'Unauthorized') {
        super(message)

        this.name = 'UnauthorizedError'
        this.statusCode = 401
    }
}

class BadRequestError extends HttpError {
    constructor(message = 'Bad request') {
        super(message)

        this.name = 'BadRequestError'
        this.statusCode = 400
    }
}

module.exports = {
    HttpError,
    NotFoundError,
    ForbiddenError,
    UnauthorizedError,
    BadRequestError
}
