import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>Store</title>
      </Head>

      <nav>
        <ul>
          <li>
            <Link href='/products'>
              <a>Products</a>
            </Link>
          </li>
        </ul>
      </nav>

      <main>
        <section>
          Imagens
        </section>
      </main>

      <footer>
        Powered by{ ' ' }
        <span>
          Fnd Caique
        </span>
      </footer>
    </>
  )
}
