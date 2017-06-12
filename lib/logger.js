const path = require('path')
const winston = require('winston')

const getTransports = () => {
    switch (process.env.NODE_ENV) {
        case 'production': {
            return [
                new winston.transports.Console({
                    level: 'info',
                    timestamps: true,
                    humanReadableUnhandledException: true
                })
            ]
        }
        case 'development': {
            return [
                new winston.transports.Console({
                    level: 'debug',
                    colorize: true,
                    timestamps: true,
                    humanReadableUnhandledException: true,
                    handleExceptions: true
                }),

                new winston.transports.File({
                    level: 'debug',
                    timestamps: true,
                    filename: path.resolve('./logs/log')
                })
            ]
        }
        case 'test': {
            return []
        }
    }
}

module.exports = new winston.Logger({
    transports: getTransports()
})
