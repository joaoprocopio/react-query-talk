import { useCallback, useEffect, useState } from "react"

import * as FrogServices from "~/services/frog"

export default function Exemplo1() {
  const [frog, setFrog] = useState<FrogServices.Frog | undefined>(undefined)

  const handleFetchRandomFrog = useCallback(async () => {
    setFrog(undefined)

    const frog = await FrogServices.getRandomFrog()

    setFrog(frog)
  }, [])

  useEffect(() => {
    handleFetchRandomFrog()
  }, [])

  return (
    <div className="grid grid-rows-[2rem_24rem_4rem] gap-12">
      <h1 className="font-bold text-3xl">{frog?.name}</h1>

      <div className="flex gap-2">
        <img src={frog?.url} className="object-cover w-96" />

        {Array.isArray(frog?.aliases) && frog!.aliases!.map((alias) => <p>{alias}</p>)}
      </div>

      <button className="w-96 h-full border" onClick={handleFetchRandomFrog}>
        me dá outro
      </button>
    </div>
  )
}
