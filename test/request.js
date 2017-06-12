exports.getRequestMock = (options = {}) => {
    options.headers = options.headers || {}
    options.method = options.method || 'GET'
    options.originalUrl = options.originalUrl || '/test'
    options.auth = options.auth || {}
    options.ip = options.ip || '127.0.0.1'

    const req = {
        method: options.method,
        originalUrl: options.originalUrl,
        auth: options.auth,

        get: header => options.headers[header]
    }

    return req
}
