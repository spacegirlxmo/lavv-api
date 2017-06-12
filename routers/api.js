const express = require('express')

const errors = require('../lib/errors')
const middleware = require('../lib/middleware')

const user = require('./user')

const router = express.Router()

router.use(middleware.setHeaders)
router.use(middleware.preflightHandler)
router.use(middleware.authenticate)

router.use('/user', user.router)

router.all('/*', (req, res, next) => {
    return next(new errors.NotFoundError())
})

exports.router = router
