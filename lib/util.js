const uuid = require('uuid')

exports.normalize = text => text.replace(/[^A-Za-z0-9]/g, '-').toLowerCase()

exports.createRefreshToken = () => 'r' + uuid.v1().replace(/-/g, '')

exports.whitelist = (attributes = {}, fields = []) => {
    return fields.reduce((result, field) => {
        if (attributes[field]) result[field] = attributes[field]

        return result
    }, {})
}

exports.getRequestInfo = req => ({
    ip: req.ip,
    userAgent: req.get('user-agent'),
    appKey: req.get('AppKey')
})
