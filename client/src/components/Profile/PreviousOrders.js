import PreviousOrderItem from "./PreviousOrderItem";
import classes from "./PreviousOrders.module.css";
import { useState, useContext } from "react";
import AuthContext from "../../store/auth-context";

let orderItem;
let fetchData;
let noOfPages = 1;

let startIndx;
let stopIndx;
const PreviousOrders = () => {

  const authCtx = useContext(AuthContext);
  
  const [currentPage, setCurrentPage] = useState(1);

  const pageHandler = (e) => {
    const target = e.target;
    const span = target.dataset.span;


    if (+span === 0) {
      setCurrentPage(currentPage - 1);
    } else if (+span === 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  startIndx = (currentPage - 1) * 2;
  stopIndx = startIndx + 2;

  const [fetchData, setFetchData] = useState(false);
  const graphqlQuery = {
    query: ` query {
          getPreviousOrders {
            orders{
              _id
              products{
                product{
                  _id
                  title
                  imageUrl
                  price
                       }
                quantity
                       }
            }
    
  }   
               
          }`,
  };
  const fetchOrders = async function () {
  
    const data = await fetch("https://thefoodtruck.herokuapp.com/graphql", {
      method: "POST",
      body: JSON.stringify(graphqlQuery),
      headers: {
        Authorization: "Bearer " + authCtx.token,
        "Content-Type": "application/json",
      },
    });

    const response = await data.json();

    const arrayObj = response.data.getPreviousOrders.orders;
    orderItem = arrayObj.map((item, i) => {
     
      const totalAmount = item.products.reduce((acc,curr)=>{
        return acc + ( curr.product.price * curr.quantity)
      },0)
      return {
        id: item._id,
        items: item.products,
        totalAmount,
      };
    });

    noOfPages = Math.ceil(orderItem.length / 2);
    setFetchData(true);
  };
  fetchOrders();
  return (
    <div className={classes.mainDiv}>
      <h5>Order History</h5>
      <ul>
        {fetchData && orderItem && orderItem.length > 0 &&
          orderItem
            .slice(startIndx, stopIndx)
            .map((item, ind) => (
              <PreviousOrderItem
                list={item}
                indx={(currentPage - 1) * 2 + ind + 1}
              />
            ))}
            {fetchData && orderItem && orderItem.length < 1 &&
            <h3>No previous orders to display</h3>
         }
      </ul>
      {fetchData && orderItem &&  orderItem.length > 0 &&  (
        <div className={classes.btnGrp}>
          {currentPage > 1 && (
            <button onClick={pageHandler} data-span={0}>
              Previous
            </button>
          )}
          <button>{currentPage}</button>

          {currentPage < noOfPages && (
            <button onClick={pageHandler} data-span={1}>
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default PreviousOrders;
