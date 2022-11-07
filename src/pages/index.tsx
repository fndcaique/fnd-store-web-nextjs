import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  console.log('home');
  
  return (
    <>
      <Head>
        <title>Store</title>
      </Head>

      <main>

        <Link href="/products/buy" >Comprar</Link>

      </main>

      <footer>
        Powered by{ ' ' }
        <span>
          Fnd Caique
        </span>
      </footer>
    </>
  );
}
