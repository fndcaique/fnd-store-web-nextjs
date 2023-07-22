import Button from './Button';

export function ProductsTable({
  products,
  handleDeleteProduct,
  handleEditProduct
}) {
  const totalBuyPrice = () => {
    return products.reduce((subtotal, { buyPrice, quantity }) => {
      return subtotal + buyPrice * quantity;
    }, 0);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Preço unit. de compra</th>
          <th>Preço unit. de venda</th>
          <th>Quantidade</th>
          <th>Total</th>
          <th>Ação</th>
        </tr>
      </thead>
      <tbody>
        {products.map(({ name, buyPrice, sellPrice, quantity }, index) => (
          <tr key={name + buyPrice + quantity + index}>
            <td>{name}</td>
            <td>{buyPrice}</td>
            <td>{sellPrice}</td>
            <td>{quantity}</td>
            <td>{buyPrice * quantity}</td>
            <td
              style={{
                display: 'flex'
              }}
            >
              <Button type='button' onClick={() => handleDeleteProduct(index)}>
                Remover
              </Button>
              <Button type='button' onClick={() => handleEditProduct(index)}>
                Editar
              </Button>
            </td>
          </tr>
        ))}
        <tr>
          <td>Total</td>
          <td></td>
          <td></td>
          <td>{totalBuyPrice()}</td>
        </tr>
      </tbody>
    </table>
  );
}
