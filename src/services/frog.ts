const BASE_URL = "http://localhost:8000/api"

export interface Frog {
  name: string
  url: string
  aliases?: string[]
}

export async function getRandomFrog(): Promise<Frog> {
  const res = await fetch(`${BASE_URL}/frogs/random`)
  const json = await res.json()

  return json as Frog
}
