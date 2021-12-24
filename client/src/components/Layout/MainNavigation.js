import { useContext, Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartModal from "./CartModal";

import AuthContext from "../../store/auth-context";
import classes from "./MainNavigation.module.css";
import CartIcon from "./CartIcon";

import CartContext from "../../store/cart-context";
let arrayItems;
let totalAmount =0;
let replinishArray;
let newArrayItems;

const MainNavigation = () => {
 

  const [products, setProducts] = useState(false);
  const [highlighted, setHighlighted] = useState(false);
  const [showMenuDropdown, setshowMenuDropdown] = useState(false);
  const authCtx = useContext(AuthContext);
  const CartCtx = useContext(CartContext);

  useEffect(() => {
    if (authCtx.isLoggedIn){
      const graphqlQuery = {
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
      fetch("http://localhost:8000/graphql", {
        method: "POST",
        body: JSON.stringify(graphqlQuery),
        headers: {
          Authorization: "Bearer " + authCtx.token,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((resData) => {
          arrayItems = resData.data.getCart.products;

          newArrayItems = arrayItems.map(item=>{
            totalAmount += (+item.product.price * +item.quantity);
           return {
             amount:item.quantity,
             id:item.product._id,
             name:item.product.title,
             image:item.product.imageUrl,
             price:item.product.price
           }
         });
         
         replinishArray = {items:newArrayItems,totalAmount:totalAmount}
         
      CartCtx.replenishCart(replinishArray);
          }
        );
  
  
    }
    


  }, []);
  useEffect(() => {
    setHighlighted(true);

    const timer = setTimeout(() => {
      setHighlighted(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [CartCtx.items.length]);
  const cartNumclasses = `${classes.badge} ${highlighted ? classes.bump : ""}`;
  const showCartHandler = () => {
    CartCtx.toggleCart();
  };
  const closeCartHandler = () => {
    CartCtx.toggleCart();
  };
  const showMenuHandler = () => {
    setshowMenuDropdown(prevState=>{
      return !prevState
    });
  };
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
    // optional: redirect the user
  };

  return (
    <Fragment>
      {authCtx.isLoggedIn && CartCtx.showCart && (
        <CartModal onClose={closeCartHandler} />
      )}
      <header className={classes.header}>
        <Link to="/">
          <div className={classes.logodiv}>
            <img src="https://cdn-icons-png.flaticon.com/512/45/45332.png" />
            <div className={classes.logo}>Food Truck</div>
          </div>
        </Link>
        <nav>
          <ul className={classes.ulClass}>
            {!isLoggedIn && (
              <li>
                <Link to="/auth">Login</Link>
              </li>
            )}
            {isLoggedIn && (
              <button onClick={showCartHandler}>
                <span className={classes.icon}>
                  <CartIcon />
                </span>
                <span className={classes.heading}>Cart</span>
                <span className={cartNumclasses}>{CartCtx.items.length}</span>
              </button>
            )}

            {isLoggedIn && (

              <li>
                <Link className={classes.liMenu} to="/profile">
                  Profile
                </Link>
                <ul>
                  <li>
                    <Link className={classes.insideLink} to="/previousOrders">
                      Previous Orders
                    </Link>
                  </li>
                  <li>
                    <button
                      className={classes.insideLink}
                      onClick={logoutHandler}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            )}
            
          </ul>
          {isLoggedIn && (<ul className={classes.ulMenu}>
         
              <li>
                <div className={classes.menuHam} onClick={showMenuHandler}><i class="fas fa-bars"></i></div>
               { showMenuDropdown && ( <ul>
                {!isLoggedIn && (
              <li>
                <Link to="/auth">Login</Link>
              </li>
            )}
                  { isLoggedIn && (<li>
                  <button onClick={showCartHandler}>
                <span className={classes.icon}>
                  <CartIcon />
                </span>
                <span className={classes.heading}>Cart</span>
                <span className={cartNumclasses}>{CartCtx.items.length}</span>
              </button>
                  </li>)}
                  { isLoggedIn && (<li>
                    <Link className={classes.insideLink} to="/previousOrders">
                      Previous Orders
                    </Link>
                  </li>)}
                  { isLoggedIn && (<li>
                    <button
                      className={classes.insideLink}
                      onClick={logoutHandler}
                    >
                      Logout
                    </button>
                  </li>)}
            
                </ul>)}
              </li>
          </ul>) }
          {!isLoggedIn && (<ul className={classes.ulMenuSub}>
         
         <li>
           <div className={classes.menuHam} onClick={showMenuHandler}><i class="fas fa-bars"></i></div>
          { showMenuDropdown && ( <ul>
      
         <li>
           <Link to="/auth">Login</Link>
         </li>
      
        
       
           </ul>)}
         </li>
     </ul>) }
        </nav>
      </header>
    </Fragment>
  );
};

export default MainNavigation;
