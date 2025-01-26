import { useCallback, useEffect, useState } from "react"

/*
  Agora dentro desse exemplo estamos rastreando os estados mais básicos dos dados da API — loading, erro e sucesso.

  Já que nós sincronizamos o estado que representa o sapo toda vez que é dado um clique no botão,
  tomamos para nós o que historicamente é a parte mais complexa de construir uma aplicação de qualquer tipo.

  Um efeito colatera assíncrono (*async side effect*).
  E fizemos isso de forma simples, escondemos esse detalhe da implementação com o clique de um botão.
*/

/*
  Mas infelizmente ainda não estamos prontos, esse código todo esconde um grande bug.
  Um bug do tipo que é quase imperceptível e enganosamente desperdiçador (parece legal mais causa gasto/prejuízo).

  Você consegue notar?
  Dica: O que acontece se antes da API responder a gente clicar no botão novamente?

  > Se ninguém perceber, a resposta tá no final do arquivo.
  > Na prática é um pouco mais obscuro do que parece.
*/

interface Frog {
  name: string
  url: string
  aliases?: string[]
}

export default function Example3() {
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

/* Espaçamento anti-cheat





























Fim do anti-cheat */

/*
  Resposta:

  Como o fetch executa uma requisição assíncrona, não temos ideia alguma do tempo que vai ser necessário para resolvê-la.
  É totalmente possível enquanto tiver uma requisição em andamento, o usuário clique no botão, o que vai desencadear:
  - Uma re-renderização
  - Faz com que o fetch rode novamente

  E nesse cenário, agora nós temos duas requisições acontecendo, procurando por recursos diferentes.
  E ainda pior, não sabemos nem quem vai responder primeiro.
  Em ambos estários nós estamos chamando o `setFrog` quando a requisição resolve.

  Isso significa que nós nào vamos saber em que ordem eles vão resolver.
  E nada disso importa por que no fim só importa a última requisição de resolver.

  Por fim, o que nós temos tem um nome: *race condition*.

  Para visualizar isso, é só clicar várias vezes no botão e abrir o DevTools do Chrome.
  Muitas requisições vão ser disparadas, e a tela vai atualizar todas as vezes causando re-renderizações inúteis.
*/
