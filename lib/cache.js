const logger = require('./logger')
const redis = require('redis')
const Promise = require('bluebird')

const client = redis.createClient()

client.on('error', err => {
    logger.error(err)
})

exports._get = client => {
    return (key, defaultValue) => {
        return new Promise(resolve => {
            client.get(key, value => {
                if (!value) return resolve(defaultValue)

                resolve(value)
            })
        })
    }
}

exports._set = client => {
    return (key, value) => {
        return new Promise(resolve => {
            client.set(key, value, resolve)
        })
    }
}

exports.get = exports._get(client)
exports.set = exports._set(client)
