import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  showCart: false,

  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
  toggleCart: () => {},
  replenishCart:() =>{},
});

export default CartContext;
