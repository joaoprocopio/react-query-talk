import type { RouteConfig } from "@react-router/dev/routes"
import { prefix } from "@react-router/dev/routes"
import { flatRoutes } from "@react-router/fs-routes"

const getPrefixedRoutes = async (modulePrefix: string) => {
  const routes = await flatRoutes({
    rootDirectory: `./${modulePrefix}/routes`,
  })

  return prefix(modulePrefix, routes)
}

const exemplo1ModulePrefix = "exemplo-1"
const exemplo1Routes = await getPrefixedRoutes(exemplo1ModulePrefix)

export default [...exemplo1Routes] satisfies RouteConfig
