import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { FormEvent } from "react"

export default function Create() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      const formData = new FormData(event.target as HTMLFormElement)
      const frogData = Object.fromEntries(formData.entries())

      const frog = await createFrog(frogData)

      // Esse return aqui é o result
      return frog
    },
    onMutate: async (event) => {
      const formData = new FormData(event.target as HTMLFormElement)
      const frogData = Object.fromEntries(formData.entries())

      queryClient.setQueryData(["frogs"], (frogs: Array<Frog>) => [frogData, ...frogs])

      // Esse return é o context
      return frogData
    },
    onSuccess: (result, _variables, context) => {
      queryClient.setQueryData(["todos"], (oldFrogs: Array<Frog>) =>
        oldFrogs.map((oldFrog) => (oldFrog.name === context.name ? result : oldFrog)),
      )
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(["todos"], (oldFrogs: Array<Frog>) =>
        oldFrogs.filter((oldFrog) => oldFrog.name !== context!.name),
      )
    },
  })

  return (
    <form className="flex w-96 flex-col gap-8" onSubmit={mutation.mutate}>
      <div className="flex flex-col gap-1">
        <label htmlFor="name">Name</label>
        <input className="h-10 rounded-md border px-4" name="name" />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="url">Photo URL</label>
        <input className="h-10 rounded-md border px-4" name="url" />
      </div>

      <button className="h-12 rounded-md border" type="submit">
        create
      </button>
    </form>
  )
}

interface Frog {
  name: string
  url: string
  aliases?: string[]
}

async function createFrog(frog: object): Promise<Frog> {
  const res = await fetch(`http://localhost:8000/api/frogs`, {
    method: "POST",
    body: JSON.stringify(frog),
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    throw new Error(res.statusText)
  }

  return (await res.json()) as Frog
}
