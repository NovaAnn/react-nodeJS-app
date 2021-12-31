import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  showCart: false,
  showMenu: false,

  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
  toggleCart: () => {},
  toggleMenu: () => {},
  replenishCart:() =>{},
});

export default CartContext;
