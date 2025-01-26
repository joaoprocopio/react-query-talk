import { useCallback, useEffect, useState } from "react"

/*
  Pra resolver o problema de Cumulative Layout Shift (CLS), vamos rastrear o estado de loading e um pouco de CSS.

  Utilizando o estado de loading vamos exibir um skeleton enquanto não tiver finalizado a requisição.
*/

interface Frog {
  name: string
  url: string
  aliases?: string[]
}

export default function Example2() {
  const [frog, setFrog] = useState<Frog | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)

  const handleFetchRandomFrog = useCallback(async () => {
    setFrog(undefined)
    setLoading(true)

    const res = await fetch(`http://localhost:8000/api/frogs/random`)
    const frog = (await res.json()) as Frog

    setFrog(frog)
    setLoading(false)
  }, [])

  useEffect(() => {
    handleFetchRandomFrog()
  }, [])

  return (
    <div style={{ "--frog-width": "24rem", "--frog-height": "28rem" } as React.CSSProperties}>
      <h1 className="mb-4 h-9 w-full text-3xl font-bold">{frog?.name}</h1>

      <div className="mb-8 flex gap-8">
        {!loading ? (
          <img
            src={frog?.url}
            className="h-[var(--frog-height)] w-[var(--frog-width)] overflow-hidden rounded-md object-center"
          />
        ) : (
          <div className="h-[var(--frog-height)] w-[var(--frog-width)] animate-pulse rounded-md bg-neutral-100" />
        )}

        {Array.isArray(frog?.aliases) && (
          <ul className="list-inside list-disc">
            {frog.aliases.map((alias) => (
              <li key={alias}>{alias}</li>
            ))}
          </ul>
        )}
      </div>

      <button
        className="h-12 w-[var(--frog-width)] rounded-md border font-bold"
        onClick={handleFetchRandomFrog}>
        give me another frog
      </button>
    </div>
  )
}
