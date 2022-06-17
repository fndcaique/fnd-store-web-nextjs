import React from 'react'
import ProductItem from './ProductItem'

export default function ProductsList({ products }) {
  return (
    <div className='products-list'>
      <ul>
        { products.map((product) => (
          <li key={ product.name + product.quantity }>
            <ProductItem { ...product } />
          </li>
        )) }
      </ul>
    </div>
  )
}
