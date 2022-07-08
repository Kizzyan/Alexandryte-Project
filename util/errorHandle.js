exports.err = (code, error, func) => {
    const err = new Error(error)
    err.httpStatusCode = code
    return func (err)
}