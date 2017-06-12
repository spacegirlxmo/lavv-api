const config = require('../config')
const knex = require('knex')

exports.knex = knex({
    client: 'pg',
    connection: {
        host: config.database.host,
        database: config.database.name,
        charset: 'utf8'
    },
    debug: config.database.debug
})
