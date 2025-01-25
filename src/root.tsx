import { Link, Links, Meta, Outlet, Scripts, ScrollRestoration, useMatches } from "react-router"

import type { Route } from "./+types/root"
import tailwindStylesheetUrl from "./tailwind.css?url"

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "stylesheet",
    href: tailwindStylesheetUrl,
  },
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

const exampleLinks = [
  {
    to: "/exemplo-1",
    label: "Exemplo 1",
  },
]

export default function App() {
  const matches = useMatches()

  return (
    <div>
      <header className="h-16 border-b absolute top-0 inset-x-0">
        <div className="container mx-auto flex items-center gap-8 h-full px-6">
          {exampleLinks.map((exampleLink) => (
            <Link key={exampleLink.to} to={exampleLink.to} className="underline text-blue-500">
              {exampleLink.label}
            </Link>
          ))}
        </div>
      </header>

      <main className="mt-16">
        <div className="container mx-auto py-12 px-6">
          {matches.length <= 1 ? (
            <h1 className="font-bold text-3xl">Por favor selecione um exemplo acima! 👆</h1>
          ) : (
            <Outlet />
          )}
        </div>
      </main>
    </div>
  )
}
