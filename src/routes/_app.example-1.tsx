import { useCallback, useEffect, useState } from "react"

import * as FrogServices from "~/services/frog"

/*
  O mais próximo que a gente consegue chegar de consumir dados da API utilizando os hooks built-in do React
  é usando `useEffect` para realizar a chamada, e guardar os dados em um `useState`.

  Provalvemnente você já viu e/ou escreveu muito código assim.
  Mas o problema aqui é que isso é código "nível-tutorial".

  E nós não deveríamos jogar código de "nível-tutorial" para produção.
*/

/*
  Vendo esse código já podemos reparar em dois problemas existentes:
  - tela de loading infinito.
    caso aconteça algum erro na api, vai ficar um estado de loading infinito.
  - cumulative layout shift.
    pouca estabilidade visual — toda vez que ocorre uma troca de sapo, os elementos:
    - somem
    - se reposicionam
    - reaparecem
    - e se reposicionam mais uma vez

  Esses problemas ficam mais claros, se fazer um trottle na rede e desabilitar o cache.
*/

export default function Example1() {
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
    <div style={{ "--frog-width": "24rem" } as React.CSSProperties}>
      <h1 className="font-bold text-3xl mb-4">{frog?.name}</h1>

      <div className="flex gap-8 mb-8">
        <img
          src={frog?.url}
          className="object-cover w-[var(--frog-width)] h-fit rounded-md overflow-hidden"
        />

        {Array.isArray(frog?.aliases) && (
          <ul className="list-inside list-disc">
            {frog.aliases.map((alias) => (
              <li>{alias}</li>
            ))}
          </ul>
        )}
      </div>

      <button
        className="w-[var(--frog-width)] h-12 border rounded-md font-bold"
        onClick={handleFetchRandomFrog}>
        give me another frog
      </button>
    </div>
  )
}
