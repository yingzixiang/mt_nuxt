const Redis = require('../model/RedisModel');
const UserModel = require('../model/UserModel')
const nodeMailer = require('nodemailer')
const config = require('../config/defaultConfig')
const Passport = require('../middleware/passport')


let Store = Redis.client;

var UserController = {
    registerUser: async (ctx, next) => {
        const {
            name,
            password,
            email,
            code
        } = ctx.request.body
 
        if (code) {
            const sCode = await Store.hget(`nodemail:${name}`, 'code')
            const sExpire = await Store.hget(`nodemail:${name}`, 'expire')
            if (code === sCode) {
                if (new Date().getTime() - sExpire > 3600*1000) {
                    ctx.body = {
                        code: -1,
                        msg: '验证码已过期,请重新尝试'
                    }
                    return;
                }
            } else {
                ctx.body = {
                    code: -1,
                    msg: '请填写验证码'
                }
                return 
            }
            let user = await UserModel.Users.findOne(name);
            
            if (user.length) {
                ctx.body = {
                    code: -1,
                    msg: '已被注册'
                }
                return
            }
            await UserModel.Users.createUser({name, password, email})
                .then(result => {
                    if (result) {
                        ctx.body = {
                            code: 0,
                            msg: '注册成功'
                        }
                    }
                }).catch(error => {
                    ctx.body = {
                        code: 0,
                        msg: error.code
                    }
                })
                          
        }
    },
    sendCode: async (ctx, next) => {
        let name = ctx.request.body.name;
        const saveExpire = await Store.hget(`nodemail:${name}`, 'expire')
        if (saveExpire && new Date().getTime() - saveExpire < 0) {
            ctx.body = {
                code: -1,
                msg: '验证请求过于频繁，1分钟内1次'
            }
            return false
        }
        let transporter = nodeMailer.createTransport({
            service: 'qq',
            auth: {
                user: config.smtp.user,
                pass: config.smtp.pass
            }
        })
        let ko = {
            code: config.smtp.code(),
            expire: config.smtp.expire(),
            email: ctx.request.body.email,
            user: ctx.request.body.name
        }
        let mailOptions = {
            from: `"认证邮件" <${config.smtp.user}>`,
            to: ko.email,
            subject: '《慕课网高仿美团网全栈实战》注册码',
            html: `您在《慕课网高仿美团网全栈实战》课程中注册，您的邀请码是${ko.code}`
        }
        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error)
            } else {
                Store.hmset(`nodemail:${ko.user}`, 'code', ko.code, 'expire', ko.expire, 'email', ko.email)
            }
        })
        ctx.body = {
            code: 0,
            msg: '验证码已发送,可能会有延时,有效期1分钟'
        }
    },
    signIn: async (ctx, next) => {
       return Passport.authenticate('local', function (err, user, info, status) {
            if (err) {
                ctx.body = {
                    code: -1,
                    msg: err
                }
            } else {
                if (user) {
                    ctx.body = {
                        code: 0,
                        msg: '登录成功',
                        user
                    }
                    return ctx.login(user)
                } else {
                    ctx.body = {
                        code: 1,
                        msg: info
                    }
                }
            }
        })(ctx, next)
    },
    getUser: async (ctx, next) => {
        if (ctx.isAuthenticated()) {
            const {username, email} = ctx.session.passport.user;
            ctx.body = {
                user: username,
                email
            }
        } else {
            ctx.body = {
                user: '',
                email: ''
            }
        }
    }
}

module.exports = UserController;