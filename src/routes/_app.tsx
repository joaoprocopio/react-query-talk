import { Link, Outlet } from "react-router"

const exampleLinks = [
  {
    to: "/exemplo-1",
    label: "Exemplo 1",
  },
]

export default function Home() {
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
          <Outlet />
        </div>
      </main>
    </div>
  )
}
