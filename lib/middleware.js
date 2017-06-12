const auth = require('./auth')
const errors = require('./errors')
const logger = require('./logger')
const util = require('util')

exports.authenticate = (req, res, next) => {
    logger.verbose(`API: ${req.method} ${req.originalUrl}: ${util.inspect(req.body)}`)
    req.auth = auth.unauthenticated

    const authorization = req.get('Authorization')

    if (!authorization) {
        logger.info(`API call with no token`)
        return next()
    }

    const parts = authorization.split(' ')

    if (parts[0] !== 'Bearer') {
        logger.info('Invalid Authorization header')
        return next()
    }

    const token = parts[1]
    logger.verbose(`API call with token: ${token}`)

    auth.decodeAccessToken(token).then(function(authInfo) {
        req.auth = authInfo
        next()
    })
}

exports.requireAuthenticated = (req, res, next) => {
    if (!req.auth.authenticated || req.auth.accessTokenExpired) {
        return next(new errors.UnauthorizedError())
    }

    next()
}

exports.withUser = knex => {
    return (req, res, next) => {
        if (!req.auth.userId) {
            req.auth.user = null
            return next()
        }

        knex.from('User').where('id', req.auth.userId).first(['id', 'email', 'name', 'about', 'gender', 'pronoun', 'verified', 'active']).then(user => {
            if (!user) {
                logger.error(`JWT with invalid userId: ${req.auth.userId}`)
                return next(new errors.UnauthorizedError('No user with that id'))
            }

            req.auth.user = user
            next()
        }, next)
    }
}

exports.preflightHandler = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        res.sendStatus(200)
        return
    }

    next()
}

exports.setHeaders = (req, res, next) => {
    res.set('Access-Control-Allow-Origin', req.get('origin'))
    res.set('Access-Control-Allow-Methods', 'POST,GET,DELETE,OPTIONS')
    res.set('Access-Control-Allow-Headers', req.get('Access-Control-Request-Headers'))
    res.set('Cache-Control', 'no-cache')
    res.set('Content-Type', 'application/json')

    next()
}

exports.httpErrorHandler = (err, req, res, next) => {
    if (err instanceof errors.HttpError) {
        logger.error(err)

        res.status(err.statusCode).json({
            status: err.statusCode.toString(),
            title: err.message
        })
    } else {
        next(err)
    }
}

exports.errorHandler = (err, req, res, next) => {
    logger.error(err)

    res.status(500).json({
        status: 500,
        title: err.message
    })

    next(err)
}
