import { useRef, useState,useContext} from "react";
import { useHistory } from "react-router";

import classes from "./Checkout.module.css";
import { CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useElements,useStripe } from "@stripe/react-stripe-js";
import AuthContext from "../../store/auth-context";
import CartContext from "../../store/cart-context";


const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;


const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });
  const stripe = useStripe();
  const elements = useElements();
  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
  const history = useHistory();

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = async (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }

    
    const cardElement = elements.getElement(CardElement);
  
    const paymentMethodReq = await stripe.createPaymentMethod({
      type:'card',
      card:cardElement,
      billing_details: {
        name:enteredName,
        address:{
          city:enteredCity,
          line1:enteredStreet,
          postal_code:enteredPostalCode
        }
      }
    });
 
    const result = await props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode,
      cardElement:cardElement,
      paymentMethodId:paymentMethodReq.paymentMethod.id,
    });

    
  };

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputsValidity.street ? "" : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    formInputsValidity.postalCode ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputsValidity.city ? "" : classes.invalid
  }`;

  const cardElementStyles ={
    style:{
      base:{
       
        color:'blue',
       

      },
      invalid:{
        color:'red',
      }
    }
  };
  
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formInputsValidity.postalCode && (
          <p>Please enter a valid postal code (5 characters long)!</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={cityControlClasses}>
        <label>Card Details</label>
        <div className={classes.cardElement}><CardElement options={cardElementStyles}></CardElement></div>
      </div>
      
      
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Pay  <span> ${props.totalAmount}</span></button>
      </div>
    </form>
  );
};

export default Checkout;
