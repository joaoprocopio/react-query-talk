import { Link, Outlet } from "react-router"

const exampleLinks = [
  {
    to: "/example-1",
    label: "Example 1",
  },
]

export default function Home() {
  return (
    <div>
      <header className="absolute inset-x-0 top-0 h-16 border-b">
        <div className="container mx-auto flex h-full items-center gap-8 px-6">
          {exampleLinks.map((exampleLink) => (
            <Link key={exampleLink.to} to={exampleLink.to} className="text-blue-500 underline">
              {exampleLink.label}
            </Link>
          ))}
        </div>
      </header>

      <main className="mt-16">
        <div className="container mx-auto px-6 py-12">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
