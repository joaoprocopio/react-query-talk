const Koa = require("koa")
const Url = require("node:url")
const cors = require("@koa/cors")
const { bodyParser } = require("@koa/bodyparser")

const { config } = require("./config")
const { logger } = require("./logger")
const { router } = require("./router")

const { loggerMiddleware, delayMiddleware } = require("./middleware")

const app = new Koa()

app
  .use(delayMiddleware(400))
  .use(loggerMiddleware())
  .use(cors())
  .use(bodyParser())
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
