import { useCallback, useEffect, useState } from "react"

interface Frog {
  name: string
  url: string
  aliases?: string[]
}

export default function Example2() {
  const [frog, setFrog] = useState<Frog | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<unknown>(undefined)

  const handleFetchRandomFrog = useCallback(async () => {
    setFrog(undefined)
    setLoading(true)
    setError(undefined)

    try {
      const res = await fetch(`http://localhost:8000/api/frogs/random`)

      if (!res.ok) {
        throw new Error(res.statusText)
      }

      const frog = (await res.json()) as Frog

      setFrog(frog)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    handleFetchRandomFrog()
  }, [])

  return (
    <div style={{ "--frog-width": "24rem", "--frog-height": "28rem" } as React.CSSProperties}>
      <h1 className="mb-4 h-9 w-full text-3xl font-bold">{frog?.name}</h1>

      <div className="mb-8 flex gap-8">
        {!loading ? (
          <figure>
            <img
              src={frog?.url}
              className="h-[var(--frog-height)] w-[var(--frog-width)] overflow-hidden rounded-md object-center"
            />

            {!!error && (
              <figcaption className="mt-2 text-center">
                <h2 className="text-lg font-medium">oops!</h2>
                <h3 className="text-sm">sorry, we could not find this frog...</h3>
              </figcaption>
            )}
          </figure>
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
