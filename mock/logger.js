const { pino, levels, stdTimeFunctions } = require("pino")
const { pinoHttp } = require("pino-http")
const { PinoPretty: pinoPretty } = require("pino-pretty")

const stream = pinoPretty({
  colorize: true,
  singleLine: true,
  ignore: "pid,hostname,req,res,responseTime",
  translateTime: false,
  messageFormat: (log, key) => {
    const msg = log[key]

    if ("err" in log) {
      log.level = levels.values.error
    }

    if ("responseTime" in log && "req" in log && "res" in log) {
      const responseTime = log["responseTime"]
      const method = log["req"]["method"]
      const url = log["req"]["url"]
      const status = log["res"]["statusCode"]

      return `${status} ${method} ${url} ${msg} in ${responseTime}ms`
    }

    return msg
  },
})

const logger = pino({ timestamp: stdTimeFunctions.isoTime }, stream)

const httpLogger = pinoHttp({ logger: logger })

/** @type {import("koa").Middleware} */
const loggerMiddleware = () => (ctx, next) => {
  httpLogger(ctx.req, ctx.res)

  return next()
}

module.exports = {
  logger,
  loggerMiddleware,
  levels,
}
