import { useQuery } from "@tanstack/react-query"

interface Frog {
  name: string
  url: string
  aliases?: string[]
}

async function getRandomFrog({ signal }: { signal?: AbortSignal }): Promise<Frog> {
  const res = await fetch(`http://localhost:8000/api/frogs/random`, { signal })

  if (!res.ok) {
    throw new Error(res.statusText)
  }

  const frog = await res.json()

  return frog as Frog
}

// Como o React Query executa tudo usando o queryClient, é necessário que ele esteja no topo da hierarquia dos seus componentes, confira: `entry.client.tsx`.
export default function Example4() {
  // As únicas duas coisas obrigatórias são: queryKey e queryFn.
  // queryKey é a chave do cache.
  // queryFn é a rotina executada, que *deve* retornar uma promise.
  const frogQuery = useQuery({
    queryKey: ["frog"],
    queryFn: (args) => getRandomFrog({ signal: args.signal }),
  })

  return (
    <div style={{ "--frog-width": "24rem", "--frog-height": "28rem" } as React.CSSProperties}>
      <h1 className="mb-4 h-9 w-full text-3xl font-bold">{frogQuery.data?.name}</h1>

      <div className="mb-8 flex gap-8">
        {frogQuery.isLoading || frogQuery.isRefetching ? (
          <div className="h-[var(--frog-height)] w-[var(--frog-width)] animate-pulse rounded-md bg-neutral-100" />
        ) : (
          <figure>
            <img
              src={frogQuery.data?.url}
              className="h-[var(--frog-height)] w-[var(--frog-width)] overflow-hidden rounded-md object-center"
            />

            {frogQuery.isError && (
              <figcaption className="mt-2 text-center">
                <h2 className="text-lg font-medium">oops!</h2>
                <h3 className="text-sm">sorry, we could not find this frog...</h3>
              </figcaption>
            )}
          </figure>
        )}

        {Array.isArray(frogQuery.data?.aliases) && (
          <ul className="list-inside list-disc">
            {frogQuery.data.aliases.map((alias) => (
              <li key={alias}>{alias}</li>
            ))}
          </ul>
        )}
      </div>

      <button
        className="h-12 w-[var(--frog-width)] rounded-md border font-bold"
        onClick={() => frogQuery.refetch()}>
        give me another frog
      </button>
    </div>
  )
}
