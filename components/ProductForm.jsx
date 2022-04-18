import { useState } from 'react'

export default function ProductForm({ submitMessage = 'Add', handleSubmit }) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')

  const privateHandleSubmit = (event) => {
    event.preventDefault();
    handleSubmit({
      name,
      price: Number(price),
      quantity: Number(quantity),
    });
  }

  return (
    <form className='product-form' onSubmit={ privateHandleSubmit }>
      <Input label='Name' value={ name } handleChange={ setName } />
      <Input label='Price' value={ price } type='number' handleChange={ setPrice } />
      <Input label='Quantity' value={ quantity } type='number' handleChange={ setQuantity } />
      <Button>{ submitMessage }</Button>
    </form>
  )
}