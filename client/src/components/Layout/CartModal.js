import CartContext from "../../store/cart-context";
import AuthContext from "../../store/auth-context";
import CartModalItem from "./CartModalItem";
import React, { Fragment, useContext, useState } from "react";
import Modal from "./Modal";
import classes from "./CartModal.module.css";
import Checkout from "./Checkout";
import { useHistory } from "react-router";
import {useStripe} from "@stripe/react-stripe-js";

let graphqlQuery;
let response;
let arrayItems;
let firstTime;
let newArrayItems;

const CartModal = (props) => {
  firstTime = false;
  const stripe = useStripe();
  const [isCheckingout, setIsCheckingout] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [products, setProducts] = useState(false);
  const history = useHistory();
  

  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);

  graphqlQuery = {
    query: ` query {
          getCart {
    products{
      product{
        title
        price
        _id
        imageUrl
      }
      quantity
    }
  }   
               
          }`,
  };
  const firstTimeFunction = async (graphqlQuery) => {
    const jsonResponse = await fetch("https://thefoodtruck.herokuapp.com/graphql", {
      method: "POST",
      body: JSON.stringify(graphqlQuery),
      headers: {
        Authorization: "Bearer " + authCtx.token,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return res.json();
    });

  
  };

  if (!products){
    firstTime = true;
    firstTimeFunction(graphqlQuery);
    
  }
 

  const cartItemRemoveHandler = (id) => {
    graphqlQuery = {
      query: ` mutation {
          deleteProduct(id: "${id}") 
               
          }`,
    };
    firstTimeFunction(graphqlQuery);
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    graphqlQuery = {
      query: ` mutation {
          addProduct(id: "${item.id}") 
               
          }`,
    };
    firstTimeFunction(graphqlQuery);
    cartCtx.addItem({
      id: item.id,
      name: item.name,
      amount: 1,
      price: +item.price,
      image: item.image,
    });
  };
  const orderHandler = () => {
    setIsCheckingout(true);
  };
  const timeOutHandler = () => {
    cartCtx.clearCart();
    history.replace("/");
  };
  const submitOrderHandler = async (userData) => {
    const result = await fetch(
      `https://thefoodtruck.herokuapp.com/getstripesession/${+cartCtx.totalAmount*100}`,
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + authCtx.token
        },
        body: JSON.stringify({
          amount:+cartCtx.totalAmount*100
        })
      }
    ).then(res=>{
    return res.json();
  });
 

  const confirmPayment = await stripe.confirmCardPayment(result,{
    payment_method:userData.paymentMethodId,
  });
  
  if (confirmPayment.paymentIntent.status == 'succeeded'){
    const graphqlQuery = {
      query: ` mutation {
          postOrder          
          }`,
    };
    const jsonResponse = await fetch("https://thefoodtruck.herokuapp.com/graphql", {
    method: "POST",
    body: JSON.stringify(graphqlQuery),
    headers: {
      Authorization: "Bearer " + authCtx.token,
      "Content-Type": "application/json",
    },
  })
  .then((res) => {
    return res.json();
  });

  
  setIsSending(true);

  const timer = setTimeout(timeOutHandler, 3000);
  }

  };
  return (
    <Modal>
      {!isSending && cartCtx.items.length > 0 && (
        <ul className={classes["cart-items"]}>
          {cartCtx.items &&
            cartCtx.items.map((item) => (
              <CartModalItem
                price={item.price}
                amount={item.amount}
                name={item.name}
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
                onAdd={cartItemAddHandler.bind(null, item)}
              />
            ))}
        </ul>
      )}
      {cartCtx.items.length > 0 && !isSending && (
        <React.Fragment>
          <div className={classes.totAmount}>
            <span>Total Amount:</span>
            <span>${cartCtx.totalAmount}</span>
          </div>
          {!isCheckingout && !isSending && (
            <div className={classes.actionflex}>
              <button onClick={props.onClose}>Cancel</button>
              <button onClick={orderHandler}>Checkout</button>
            </div>
          )}
        </React.Fragment>
      )}
      {isCheckingout && !isSending && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} totalAmount={cartCtx.totalAmount} />
      )}
      {isSending && (
        <div className={classes.sending}>
          <img src="https://media0.giphy.com/media/dAzkOoCgoFHtCAdFhe/200w.webp?cid=ecf05e47evrfhegpbmfzuhfehn0kcljuh9oc7oybsjmpblvw&rid=200w.webp&ct=g" />
          <p> Your order has been processed!</p>
        </div>
      )}
      {!cartCtx.items.length && <Fragment><h3>No items in cart. Start adding. Good Luck!</h3>
      <div className={classes.actionflex}>
      <button onClick={props.onClose}>Close</button>
    </div></Fragment>}
    </Modal>
  );
};
export default CartModal;
