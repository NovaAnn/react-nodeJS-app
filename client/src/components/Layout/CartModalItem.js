import classes from "./CartModalItem.module.css";

const CartModalItem = (props) => {
  
  return (
    <li className={classes.listItem}>
      <div className={classes.flexgrp}>
        <div className={classes.firstItem}>
          <h3>{props.name}</h3>
          <div className={classes.grped}>
            <span>${props.price}</span>
            <span>x {props.amount}</span>
          </div>
        </div>

        <div className={classes.lastItem}>
          <button onClick={props.onAdd}>+</button>
          <button onClick={props.onRemove}>-</button>
        </div>
      </div>
    </li>
  );
};

export default CartModalItem;
