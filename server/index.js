import Koa from 'koa'
import consola from 'consola'
import bodyParser from 'koa-bodyparser'
import session from 'koa-generic-session'
import json from 'koa-json'
import passport from './middleware/passport'
import Store from './model/RedisModel'
import users from './router/user'
import search from './router/search'
import geo from './router/geo'

const { Nuxt, Builder } = require('nuxt')

const app = new Koa()

app.keys = ['mt', 'keyskeys']
app.proxy = true;
app.use(session({key: 'mt', prefix: 'mt:uid', store: Store}))
app.use(bodyParser({
  extendTypes: ['json', 'form', 'text']
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(json())

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use(users.routes()).use(users.allowedMethods())
  app.use(search.routes()).use(search.allowedMethods())
  app.use(geo.routes()).use(geo.allowedMethods())

  app.use(ctx => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
