import Link from 'next/link'
import { useState } from 'react'
function Home() {
  const [count, setCount] = useState(0)
  return <div onClick={() => setCount(count => count + 1)}>
    <h1>{count}</h1>
    Welcome to Next.js <Link href="/papi"><a>papi!</a></Link>!</div>;
}

export default Home;