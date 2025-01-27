import { useQuery } from "@tanstack/react-query"
import { Link, Outlet } from "react-router"

export default function Example5() {
  const frogsQuery = useQuery({
    queryKey: ["frogs"],
    queryFn: (args) => listFrogs({ signal: args.signal }),
  })

  if (frogsQuery.isLoading) {
    return "Loading..."
  }

  if (frogsQuery.isError) {
    return "Errored"
  }

  return (
    <div className="grid h-[calc(100vh-64px-48px*2)] grid-cols-[16rem_1fr] overflow-hidden">
      <div className="flex flex-col gap-4 overflow-y-scroll">
        <div className="sticky top-0 flex border-b bg-white py-4">
          <Link className="mx-8 w-full rounded-md border py-2 text-center" to="./create">
            add frog
          </Link>
        </div>

        {frogsQuery.data!.map((frog) => (
          <Link
            key={frog.name}
            className="mx-8 rounded-md border py-2 text-center"
            to={`./${frog.name}`}>
            {frog.name}
          </Link>
        ))}
      </div>

      <div className="px-8">
        <Outlet />
      </div>
    </div>
  )
}

interface Frog {
  name: string
  url: string
  aliases?: string[]
}

async function listFrogs({ signal }: { signal?: AbortSignal }): Promise<Array<Frog>> {
  const res = await fetch(`http://localhost:8000/api/frogs`, { signal })

  if (!res.ok) {
    throw new Error(res.statusText)
  }

  return (await res.json()) as Array<Frog>
}
