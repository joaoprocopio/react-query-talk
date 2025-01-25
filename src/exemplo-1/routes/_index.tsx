import { useEffect, useState } from "react"

export default function Exemplo1() {
  const [frog, setFrog] = useState(undefined)

  useEffect(() => {
    const handleFetchRandomFrog = async () => {
      setFrog(undefined)

      const res = await fetch("https://frogs.media/api/random")
      const json = await res.json()

      setFrog(json)
    }

    handleFetchRandomFrog()
  }, [])

  console.log(frog)

  return <div>exemplo 1</div>
}
