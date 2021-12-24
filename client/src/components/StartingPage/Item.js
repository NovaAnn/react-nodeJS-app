import classes from "./Item.module.css";
import { useContext } from "react";
import CartContext from "../../store/cart-context";

const Item = (props) => {
  const cartCtx = useContext(CartContext);
  const { data } = props;
  // data.name = props.name;
  // data.description = props.description;
  // data.price = props.price;
  // data.amount = props.amount;
  // data.id = props.id;
  // data.image = props.image;


  const addToCartHandler = () => {
    cartCtx.addItem({
      id: data.id,
      name: data.name,
      amount: +data.amount,
      price: +data.price,
      image: data.image,
    });
  };

  return (
    <div className={classes.indDiv}>
      <img className={classes.img} src={data.image} />
      <div className={classes.grp}>
        <div className={classes.para}>{data.name}</div>
        <div className={classes.description}>{data.description}</div>
        <div>
          <span className={classes.price}>Price:</span>
          <span className={classes.para}>${data.price}</span>
        </div>
      </div>
      <button className={classes.btn} onClick={addToCartHandler}>
        ADD
      </button>
    </div>
  );
};

export default Item;
