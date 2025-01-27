import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

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

export default function Example5() {
  const [selectedFrog, setSelectedFrog] = useState<string | undefined>(undefined)

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
      <div className="flex flex-col gap-4 overflow-y-scroll px-8">
        {frogsQuery.data!.map((frog) => (
          <button
            className="cursor-pointer rounded-md border py-2"
            onClick={() => setSelectedFrog(frog.name)}>
            {frog.name}
          </button>
        ))}
      </div>

      <Froggy selectedFrog={selectedFrog} />
    </div>
  )
}

function Froggy({ selectedFrog }: { selectedFrog?: string }) {
  const frogQuery = useQuery({
    queryKey: ["frogs"],
    queryFn: (args) => listFrogs({ signal: args.signal }),
    // O select vai ser re-executado toda vez que a referência da função mudar, logo você não deve passar () => ... diretamente
    // Ou quando os argumentos da função mudam.
    select: findFrogByName(selectedFrog!),
    enabled: !!selectedFrog,
  })

  // Mas você também pode fazer o tech diretamente usando
  // const frogQuery = useQuery({
  //   queryKey: ["frogs", selectedFrog],
  //   queryFn: (args) => getFrog({ frog: selectedFrog!, signal: args.signal }),
  //   enabled: !!selectedFrog,
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
        className="mb-4 h-96 w-full overflow-hidden rounded-md object-center"
      />

      {Array.isArray(frogQuery.data?.aliases) && (
        <ul className="list-inside list-disc">
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
