import type { RouteConfig } from "@react-router/dev/routes"
import { prefix } from "@react-router/dev/routes"
import { flatRoutes } from "@react-router/fs-routes"

type ModulePrefixes = "exemplo-1" | "exemplo-2"

const getModulePrefixedRoutes = async (modulePrefix: ModulePrefixes) => {
  const routes = await flatRoutes({
    rootDirectory: `./${modulePrefix}/routes`,
  })
  const prefixedRoutes = prefix(modulePrefix, routes)

  return prefixedRoutes
}

const exemplo1Routes = await getModulePrefixedRoutes("exemplo-1")

export default [...exemplo1Routes] satisfies RouteConfig
