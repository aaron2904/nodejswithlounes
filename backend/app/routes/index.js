module.exports = (app) => {
    require('./auth')(app)
    require('./product')(app)
}