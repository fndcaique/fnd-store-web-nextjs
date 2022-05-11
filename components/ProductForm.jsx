import Button from './Button'
import Input from './Input'

export default function ProductForm({
  product: { name, price, quantity },
  handleInputChange,
  submitMessage = 'Adicionar',
  cancelMessage = 'Cancelar',
  isFormValid,
  isFormEmpty,
  handleSubmit,
  handleReset,
}) {

  return (
    <form className='product-form' onSubmit={ (event) => {
      event.preventDefault();
      handleSubmit();
    } }>
      <Input
        label='Nome'
        name='name'
        value={ name }
        onChange={ handleInputChange }
      />
      <Input
        label='Preço'
        name='price'
        value={ price }
        type='number'
        onChange={ handleInputChange }
      />
      <Input
        label='Quantidade'
        name='quantity'
        value={ quantity }
        type='number'
        onChange={ handleInputChange }
      />
      <Button
        type='submit'
        disabled={ !isFormValid() }
      >
        { submitMessage }
      </Button>
      <Button
        type='reset'
        disabled={ isFormEmpty() }
        onClick={ handleReset }
      >
        { cancelMessage }
      </Button>
    </form >
  );
}
