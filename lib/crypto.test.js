const expect = require('chai').expect
const crypto = require('./crypto')

describe('crypto', function() {
    it('should hash a password', function() {
        return crypto.hashPassword('lavv').then(hash => {
            expect(hash).to.be.ok
            expect(hash).to.be.a('string')
        })
    })

    it('should compare a password', function() {
        return crypto.hashPassword('lavv').then(hash => {
            return crypto.comparePassword('lav', hash).then(res => {
                expect(res).to.be.false

                return crypto.comparePassword('lavv', hash).then(res => {
                    expect(res).to.be.true
                })
            })
        })
    })

    it('should hash strings', function() {
        return crypto.hash('lavv').then(hash => {
            expect(hash).to.be.ok
            expect(hash).to.be.a('string')
        })
    })
})
