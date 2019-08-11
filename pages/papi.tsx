import { useState, useEffect } from 'react'
import { NextPage } from 'next'
import content from '../content/home.md'
import { useObserver, useLocalStore } from 'mobx-react-lite'
import fetch from 'isomorphic-unfetch'
import { observable } from 'mobx'

interface CatPage {
  title: string;
  date: string;
  cats: { description: string; name: string; }[]
}

function useField(initialValue: string) {
  const store = useLocalStore(() => ({
    value: initialValue,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      store.value = e.target.value;
    },
  }))
  return store
}

const Papi: NextPage<{}> = () => {
  const { html, attributes } = content
  const { title, cats } = attributes as CatPage
  const m = useField('hoho')
  const store = useLocalStore(() => ({
    name: '',
    setName: (e: React.ChangeEvent<HTMLInputElement>) => {
      store.name = e.target.value;
    },
    get bigName() {
      return m.value.toUpperCase()
    },
    setCard: card => { store.card = card },
    card: undefined as any
  }))
  const f = async () => {
    const resp = await fetch('https://api.scryfall.com/cards/random')
    const data = await resp.json()
    store.setCard(data)
  }
  useEffect(() => { f() }, [])
  return useObserver(() =>
    <article>
      <h1>{title}</h1>
      <p>{store.bigName}</p>
      <input {...m} />
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
      <div>
        {store.card && store.card.image_uris && <img src={store.card.image_uris.normal} alt="card" />}
      </div>
    </article>
  )
}

export default Papi;