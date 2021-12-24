import classes from "./PreviousOrderItem.module.css";
import CartContext from "../../store/cart-context";
import AuthContext from "../../store/auth-context";
import { useContext } from "react";

const PreviousOrderItem = (props) => {
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const addToCartHandler = (item) => {
    cartCtx.addItem({
      id: item.product._id,
      name: item.product.title,
      amount: 1,
      price: +item.product.price,
    });
  };
  const invoiceHandler = async (orderId) => {
    const result = await fetch(
      `http://localhost:8000/getInvoice/${orderId}`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + authCtx.token
        },
      
      }
    ).then(res=>{
    return res.json();
  });

  };
  return (
    <li className={classes.list}>
      <h2>Order No : {props.list.id}</h2>
      
      {props.list.items.map((item) => (
        <div className={classes.itemlist}>
          <div className={classes.itemImgDiv}> 
          <img src={item.product.imageUrl} />
          </div>
         
          <div className={classes.itemflex}>
            <h2>
              {item.product.title}
              <span>(x {item.quantity})</span>{" "}
            </h2>
            <h3>
              <span>${item.product.price}</span>
            </h3>
            <button onClick={addToCartHandler.bind(null, item)}>
              Order Again
            </button>
          </div>
        </div>
      ))}
      <h3 className={classes.listh3}>
        Total Amount: <span> ${props.list.totalAmount}</span>
      </h3>
      <h6>You saved $0 on this order</h6>
    </li>
  );
};

export default PreviousOrderItem;
