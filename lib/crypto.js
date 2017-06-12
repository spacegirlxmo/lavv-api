const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const Promise = require('bluebird')

const logger = require('./logger')

exports.hashPassword = password => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                logger.error('hashPassword: Error generating salt')
                return reject(new Error(err))
            }

            bcrypt.hash(password, salt, function(err, hash) {
                if (err) {
                    logger.error(`hashPassword: Error hashing password: ${password}`)
                    return reject(err)
                }

                resolve(hash)
            })
        })
    })
}

exports.comparePassword = (password, passwordHash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, passwordHash, (err, res) => {
            if (err) {
                return reject(err)
            }

            resolve(res)
        })
    })
}

exports.sign = (content, secret) => {
    const hmac = crypto.createHmac('sha256', secret)

    hmac.update(content)
    return hmac.digest('hex')
}

exports.hash = content => {
    return new Promise((resolve, reject) => {
        const shasum = crypto.createHash('sha1')

        shasum.on('error', function() {
            reject()
        })

        shasum.end(content, 'utf8', function() {
            resolve(shasum.read().toString())
        })
    })
}
