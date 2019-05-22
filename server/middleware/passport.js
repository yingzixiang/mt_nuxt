const passport = require('koa-passport')
const LocalStrategy = require('passport-local')
const UserModel = require('../model/UserModel')

passport.use(new LocalStrategy(async function(username, password, done) {
    let result = await UserModel.Users.findOne(username)
    if (result != null) {
        if(result[0].password === password) {
            return done(null, result[0])
        } else {
            return done(null, false, '密码错误')
        }
    } else {
        return done(null, false, '该用户不存在')
    }
}))

passport.serializeUser(function (user, done) {
    done(null, user)
})

passport.deserializeUser(function (user, done) {
    return done(null, user)
})

module.exports = passport