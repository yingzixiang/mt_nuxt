const Redis = require('koa-redis')
const config = require('../config/defaultConfig')

let Store = new Redis({
    host: config.redis.host,
    port: config.redis.port,
    prefix: 'mt:',
    ttl: 60*60*23,
    password: config.redis.password
})

module.exports = Store;