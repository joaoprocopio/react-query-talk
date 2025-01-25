const Koa = require("koa")
const Router = require("@koa/router")
const Url = require("node:url")

const { config } = require("./config")
const { logger, loggerMiddleware } = require("./logger")

const app = new Koa()
const router = new Router()

router.get("/", async (ctx, next) => {
  ctx.body = { abc: 123 }

  return next()
})

app
  .use(loggerMiddleware())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(config.port, config.host, () => {
    const addr = Url.format({
      protocol: "http",
      hostname: config.host,
      port: config.port,
    })

    logger.info(`server is listening on: ${addr}`)
  })
