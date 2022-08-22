import React, { useState } from 'react';

type CartProduct = {
  id: number;
  price: string;
};

export const StateMutationHookExample = () => {
  const [state, setState] = useState({
    color: 'green',
    size: 20,
    product: {
      id: 1,
      name: 'Tada',
      unit: 'package',
      price: '100,000 VND',
      quantity: 100
    },
    cart: {
      products: []
    }
  });

  const handleClick = () => {
    // completely doesn't work with hook API
    // const newState = state;
    // but if we cloned this object -> it works
    const newState = { ...state };
    newState.color = 'red';
    newState.product.quantity -= 1;
    if (newState.cart.products) {
      (newState.cart.products as Array<CartProduct>).push({
        id: newState.product.id,
        price: newState.product.price
      });
    }

    setState(newState);
  };
  const { color, size, product, cart } = state;
  return (
    <>
      <p>Color: {color}</p>
      <p>Size: {size}</p>
      <hr />
      <p>Product: {product.price}</p>
      <p>Quantity: {product.quantity}</p>
      <hr />
      <p>Cart</p>
      {cart.products.map((p, idx) => (
        <p key={idx}>{(p as CartProduct).id}</p>
      ))}
      <button className="bg-red-300" onClick={handleClick}>
        Change Color
      </button>
    </>
  );
};
