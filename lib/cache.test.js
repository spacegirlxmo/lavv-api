const expect = require('chai').expect
const cache = require('./cache')

describe('cache', function() {
    it('should get a value', function() {
        const client = {
            get: (key, callback) => {
                callback('test')
            }
        }

        const get = cache._get(client)

        return get('testKey', 4).then(value => {
            expect(value).to.be.ok
            expect(value).to.equal('test')
        })
    })

    it('should get a default value', function() {
        const client = {
            get: (key, callback) => {
                callback()
            }
        }

        const get = cache._get(client)

        return get('testKey', 4).then(value => {
            expect(value).to.be.ok
            expect(value).to.equal(4)
        })
    })
})
