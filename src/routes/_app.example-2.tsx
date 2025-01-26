import { useCallback, useEffect, useState } from "react"

import * as FrogServices from "~/services/frog"

/*
  Pra resolver esses
*/

export default function Example2() {
  const [frog, setFrog] = useState<FrogServices.Frog | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)

  const handleFetchRandomFrog = useCallback(async () => {
    setFrog(undefined)
    setLoading(true)

    const frog = await FrogServices.getRandomFrog()

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
