import Button from './Button';

export function ProductsTable({
  products,
  handleDeleteProduct,
  handleEditProduct,
}) {

  const totalPrice = () => {
    return products.reduce((subtotal, { price, quantity }) => {
      return subtotal + price * quantity;
    }, 0);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Preço Unit.</th>
          <th>Quantidade</th>
          <th>Total</th>
          <th>Ação</th>
        </tr>
      </thead>
      <tbody>
        { products.map(({ name, price, quantity }, index) => (
          <tr key={name + price + quantity + index}>
            <td>{ name }</td>
            <td>{ price }</td>
            <td>{ quantity }</td>
            <td>{ price * quantity }</td>
            <td style={{
              display: 'flex', 
            }}>
              <Button
                type="button"
                onClick={() => handleDeleteProduct(index)}
              >
                Remover
              </Button>
              <Button
                type="button"
                onClick={() => handleEditProduct(index)}
              >
                Editar
              </Button>
            </td>
          </tr>
        )) }
        <tr>
          <td>Total</td>
          <td></td>
          <td></td>
          <td>{ totalPrice() }</td>
        </tr>
      </tbody>
    </table >
  );
}
