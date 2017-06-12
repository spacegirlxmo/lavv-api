const express = require('express')
const app = express()

const logger = require('./lib/logger')
const middleware = require('./lib/middleware')

const bodyParser = require('body-parser')

app.set('port', (process.env.PORT || 5000))

app.use(bodyParser.json())

app.use('/api', require('./routers/api').router)

app.use(middleware.httpErrorHandler)
app.use(middleware.errorHandler)

app.listen(app.get('port'), () => {
    logger.info(`Lavv API listening on port ${app.get('port')}`)
})
