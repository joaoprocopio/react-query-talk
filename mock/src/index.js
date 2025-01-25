const Koa = require("koa")
const Url = require("node:url")
const cors = require("@koa/cors")

const { config } = require("./config")
const { logger, loggerMiddleware } = require("./logger")
const { router } = require("./router")

const app = new Koa()

app
  .use(loggerMiddleware())
  .use(cors())
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
