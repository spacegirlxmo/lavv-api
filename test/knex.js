const Promise = require('bluebird')

exports.getKnexMock = (options = {}) => {
    options.data = options.data || []

    let inserts = []

    return {
        from: function() {
            return this
        },

        select: function() {
            return this
        },

        where: function() {
            return this
        },

        count: function() {
            return this
        },

        returning: function() {
            return this
        },

        insert: function(updates) {
            inserts.push(updates)
        },

        then: function() {
            return Promise.resolve(options.data)
        },

        _getInsert: function(index) {
            return inserts[index]
        }
    }
}
