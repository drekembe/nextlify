import { NextPage } from 'next'
import content from '../content/home.md'

interface CatPage {
  title: string;
  date: string;
  cats: { description: string; name: string; }[]
}

const Papi: NextPage<{}> = () => {
  const { html, attributes } = content
  const { title, cats } = attributes as CatPage
  return <article>
    <h1>{title}</h1>
    hey papi
    <div dangerouslySetInnerHTML={{ __html: html }} />
    <ul>
              { cats.map((cat, k) => (
                  <li key={k}>
                    <h2>{cat.name}</h2>
                    <p>{cat.description}</p>
                  </li>
              ))}
          </ul>
  </article>
}

export default Papi;