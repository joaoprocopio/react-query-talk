const { pinoHttp } = require("pino-http")
const { logger } = require("./logger")
const { delay } = require("./util")

const httpLogger = pinoHttp({ logger: logger })

/** @type {import("koa").Middleware} */
const loggerMiddleware = () => (ctx, next) => {
  httpLogger(ctx.req, ctx.res)

  return next()
}

/** @type {import("koa").Middleware} */
const delayMiddleware = (ms) => async (_, next) => {
  await delay(ms)

  return next()
}

module.exports = {
  loggerMiddleware,
  delayMiddleware,
}
