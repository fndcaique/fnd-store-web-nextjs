import Link from 'next/link';
import ProductsList from '../../components/ProductsList';
import { getProducts } from '../../services/products';

export default function Products() {
  return (
    <div>
      <h1>Produtos</h1>
      <Link href="/products/buy">
        Comprar
      </Link>

      <ProductsList products={getProducts()} />
    </div>
  );
}
