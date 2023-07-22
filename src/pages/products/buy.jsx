import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import ProductForm from '../../components/ProductForm';
import { ProductsTable } from '../../components/ProductsTable';
import { getProducts } from '../../services/products';

const PRODUCT_INITIAL_VALUE = {
  name: '',
  sellPrice: '',
  buyPrice: '',
  quantity: ''
};

export default function BuyProducts() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(PRODUCT_INITIAL_VALUE);
  const [isEditing, setIsEditing] = useState(false);
  const [idToEdit, setIdToEdit] = useState(-1);

  const router = useRouter();

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const saveProducts = (data) => {
    localStorage.setItem('products', JSON.stringify(data));
  };

  const handleInputChange = ({ target: { name, value } }) => {
    setProduct({
      ...product,
      [name]: value
    });
  };

  const isValidNumber = (numberOrStrNumber) => {
    const realNumber = Number(numberOrStrNumber);
    return realNumber > 0;
  };

  const isFormEmpty = () => {
    return Object.values(product).every((value) => value.length === 0);
  };

  const resetForm = () => {
    setProduct(PRODUCT_INITIAL_VALUE);
  };

  const isFormValid = () => {
    const { quantity } = product;
    return !isFormEmpty() && isValidNumber(quantity);
  };

  const handleSubmitProduct = () => {
    if (isEditing) {
      setProducts([
        ...products.slice(0, idToEdit),
        product,
        ...products.slice(idToEdit + 1)
      ]);
      setIsEditing(false);
    } else {
      setProducts([...products, product]);
      saveProducts([...products, product]);
    }
    resetForm();
  };

  const handleDeleteProduct = (index) => {
    setProducts(products.filter((product, idx) => idx !== index));
  };

  const handleEditProduct = (index) => {
    setIsEditing(true);
    setIdToEdit(index);
    setProduct(products.find((product, idx) => idx === index));
  };

  const handleFinalizeBuy = () => {
    router.push('/products');
  };

  return (
    <div className='buy-page'>
      <h1>Comprar Produtos</h1>
      <section>
        <ProductForm
          product={product}
          handleInputChange={handleInputChange}
          submitMessage={isEditing ? 'Editar' : 'Adicionar'}
          isFormValid={isFormValid}
          isFormEmpty={isFormEmpty}
          handleSubmit={handleSubmitProduct}
          handleReset={resetForm}
        />
      </section>
      <section>
        <ProductsTable
          products={products}
          handleDeleteProduct={handleDeleteProduct}
          handleEditProduct={handleEditProduct}
        />
      </section>
      <Button type='button' onClick={handleFinalizeBuy}>
        Finalizar Compra
      </Button>
    </div>
  );
}
