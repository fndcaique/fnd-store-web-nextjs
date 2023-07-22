import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  console.log('home');

  return (
    <>
      <Head>
        <title>Store</title>
      </Head>

      <nav>
        <ul>
          <li>
            <Link href='/products'>Products</Link>
          </li>
        </ul>
      </nav>

      <footer>
        Powered by <span>Fnd Caique</span>
      </footer>
    </>
  );
}
