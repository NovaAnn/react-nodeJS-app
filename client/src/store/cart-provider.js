import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
  showCart: false,
  showMenu:false,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
  
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
      showCart: state.showCart,
      showMenu:state.showMenu,
    };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
      showCart: state.showCart,
      showMenu:state.showMenu,
    };
  }

  if (action.type === "CLEAR") {
    return defaultCartState;
  }
  if (action.type === "TOGGLE") {
    const toggler = !state.showCart;
    return {
      items: state.items,
      totalAmount: state.totalAmount,
      showCart: toggler,
      showMenu:state.showMenu,
    };
  }
  if (action.type === "TOGGL") {
    const toggler = action.val;
    return {
      items: state.items,
      totalAmount: state.totalAmount,
      showCart:state.showCart,
      showMenu: toggler,
    };
  }
  if (action.type === "REPLENISH") {
    
    return {
      items: action.replenishArray.items,
      totalAmount: action.replenishArray.totalAmount,
      showCart: state.showCart,
      showMenu:state.showMenu,
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };
  const toggleCartHandler = () => {
    dispatchCartAction({ type: "TOGGLE" });
  };
  const toggleMenuHandler = (val) => {
    dispatchCartAction({ type: "TOGGL",val:val });
  };
  const replenishCartHandler = (replenishArray) => {
    dispatchCartAction({ type: "REPLENISH",replenishArray:replenishArray });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    showCart: cartState.showCart,
    showMenu: cartState.showMenu,

    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
    toggleCart: toggleCartHandler,
    toggleMenu: toggleMenuHandler,
    replenishCart:replenishCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
