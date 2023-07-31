import React from 'react';

export default function ProductItem({ name, quantity }) {
  return (
    <div className='product-item'>
      <p>
        <strong>{name}</strong>
      </p>
      <p>{quantity}</p>
    </div>
  );
}
