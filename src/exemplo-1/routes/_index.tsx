import { useEffect, useState } from "react"

import * as FrogServices from "~/exemplo-1/services/frog"

export default function Exemplo1() {
  const [frog, setFrog] = useState<FrogServices.Frog | undefined>(undefined)

  useEffect(() => {
    const handleFetchRandomFrog = async () => {
      setFrog(undefined)

      const frog = await FrogServices.getRandomFrog()

      setFrog(frog)
    }

    handleFetchRandomFrog()
  }, [])

  console.log(frog)

  return <div>exemplo 1</div>
}
