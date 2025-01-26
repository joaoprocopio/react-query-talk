import { useCallback, useEffect, useState } from "react"

import * as FrogServices from "~/services/frog"

/*
  O mais próximo que a gente consegue chegar de consumir dados da API utilizando os hooks built-in do React
  é usando `useEffect` para realizar a chamada, e guardar os dados em um `useState`.
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
      <h1 className="mb-4 text-3xl font-bold">{frog?.name}</h1>

      <div className="mb-8 flex gap-8">
        <img
          src={frog?.url}
          className="w-[var(--frog-width)] overflow-hidden rounded-md object-center"
        />

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

/*
  Provalvemente você já viu e/ou escreveu muito código assim.
  Mas o problema aqui é que isso é código "nível-tutorial".

  E nós não deveríamos jogar código de "nível-tutorial" para produção.
*/

/*
  Vendo esse código já podemos reparar em dois problemas existentes:
  - tela de loading infinito.
    caso aconteça algum erro na api, vai ficar um estado de loading infinito.

  - cumulative layout shift.
    falta rastrear o estado de loading e por isso temos pouca estabilidade visual.
    toda vez que ocorre uma troca de sapo, os elementos:
    - somem
    - se reposicionam
    - reaparecem
    - e se reposicionam mais uma vez

  Esses problemas ficam mais claros, se fazer um *throttle* na rede e **desabilitar o cache**.
*/
