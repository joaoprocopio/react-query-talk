import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router"

export default function DynamicFrog() {
  const params = useParams()

  const frogQuery = useQuery({
    // Como o React Query é um gerenciador de estado, nós podemos acessar o estado de outras queries
    queryKey: ["frogs"],
    queryFn: (args) => listFrogs({ signal: args.signal }),
    // O select vai ser re-executado toda vez que a referência da função mudar, logo você não deve passar () => ... diretamente
    // Ou quando os argumentos da função mudam.
    select: findFrogByName(params.frog!),
    enabled: !!params.frog,
  })

  // Mas você também pode fazer o fetch diretamente usando
  // const frogQuery = useQuery({
  //   queryKey: ["frogs", params.frog],
  //   queryFn: (args) => getFrog({ frog: params.frog!, signal: args.signal }),
  //   enabled: !!params.frog,
  // })

  if (frogQuery.isLoading) {
    return <div className="px-8">Loading...</div>
  }

  if (frogQuery.isError) {
    return <div className="px-8">Errored</div>
  }

  return (
    <div className="px-8">
      <img
        src={frogQuery.data?.url}
        className={"h-96 w-full overflow-hidden rounded-md object-center [&:not([src])]:hidden"}
      />

      {Array.isArray(frogQuery.data?.aliases) && (
        <ul className="mt-4 list-inside list-disc">
          {frogQuery.data.aliases.map((alias) => (
            <li key={alias}>{alias}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

const findFrogByName = (selectedFrog: string) => (frogs: Frog[]) =>
  frogs.find((frog) => frog.name === selectedFrog)

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

async function getFrog({ frog, signal }: { frog: string; signal?: AbortSignal }): Promise<Frog> {
  const res = await fetch(`http://localhost:8000/api/frogs/${frog}`, { signal })

  if (!res.ok) {
    throw new Error(res.statusText)
  }

  return (await res.json()) as Frog
}
