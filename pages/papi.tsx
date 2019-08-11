import { NextPage } from 'next'
import content from '../content/home.md'
import { useObserver, useLocalStore } from 'mobx-react-lite'

interface CatPage {
  title: string;
  date: string;
  cats: { description: string; name: string; }[]
}

const Papi: NextPage<{}> = () => {
  const { html, attributes } = content
  const { title, cats } = attributes as CatPage
  const store = useLocalStore(() => ({
    name: '',
    setName: (e: React.ChangeEvent<HTMLInputElement>) => {
      store.name = e.target.value;
    },
    get bigName() {
      return store.name.toUpperCase()
    }
  }))
  return useObserver(() =>
    <article>
      <h1>{title}</h1>
      <p>{store.bigName}</p>
      <input onChange={store.setName} value={store.name} />
      hey papi
    <div dangerouslySetInnerHTML={{ __html: html }} />
      <ul>
        {cats.map((cat, k) => (
          <li key={k}>
            <h2>{cat.name}</h2>
            <p>{cat.description}</p>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default Papi;