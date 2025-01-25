const Router = require("@koa/router")

const { frogs } = require("./data")
const { randomNumber } = require("./utils")

const router = new Router()

router.get("/api/frogs", async (ctx) => {
  ctx.body = frogs
})

router.get("/api/frogs/random", async (ctx) => {
  ctx.body = frogs[randomNumber(frogs.length)]
})

router.get("/api/frogs/:name", async (ctx) => {
  ctx.body = frogs.find((frog) => frog.name === ctx.params.name)
})

module.exports = {
  router,
}
