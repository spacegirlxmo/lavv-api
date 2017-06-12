const base = {
    token: {
        access: {
            secret: '',
            expiration: 60 * 60,
        },
        refresh: {
            expiration: 30
        }
    },
    database: {
        host: 'localhost',
        name: 'lavv',
        debug: true
    }
}

const development = {
    database: {
        host: 'localhost',
        name: 'lavv',
        debug: true
    }
}

const test = {
    database: {
        host: 'localhost',
        name: 'lavv_test',
        debug: false
    }
}

switch (process.env.NODE_ENV) {
    case 'dev':
    case 'development':
        module.exports = Object.assign({}, base, development)
        break
    case 'test':
        module.exports = Object.assign({}, base, test)
        break
    default:
        module.exports = base
}
