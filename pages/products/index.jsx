import Link from 'next/link';


export default function Products() {
  return (
    <div>
      <h1>Produtos</h1>
      <Link href='/products/buy'>
        <a>Comprar</a>
      </Link>
    </div>
  );
}
