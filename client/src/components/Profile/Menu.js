import classes from "./Menu.module.css";
import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import AuthContext from "../../store/auth-context";

let arrayItem;

const Menu = () => {
  let addToCart = false;
  const authCtx = useContext(AuthContext);
  const [fetched, setFetched] = useState(false);
  // let  arrayItem = [
  //   {
  //     dishName: "Smoky Hamburger",
  //     price: 8.5,
  //     id: "Smoky Hamburger",
  //     image:
  //       "https://c4.wallpaperflare.com/wallpaper/894/492/7/mcdonalds-burger-hd-wallpaper-preview.jpg",
  //   },
  //   {
  //     dishName: "Shared Hamburger",
  //     price: 8,
  //     id: "Shared Hamburger",
  //     image:
  //       "https://c4.wallpaperflare.com/wallpaper/894/492/7/mcdonalds-burger-hd-wallpaper-preview.jpg",
  //   },
  //   {
  //     dishName: "Smoky Hamburger",
  //     price: 7.5,
  //     id: "Smoky Hamburger",
  //     image:
  //       "https://c4.wallpaperflare.com/wallpaper/894/492/7/mcdonalds-burger-hd-wallpaper-preview.jpg",
  //   },
  //   {
  //     dishName: "Shared Hamburger",
  //     price: 8,
  //     id: "Shared Hamburger",
  //     image:
  //       "https://c4.wallpaperflare.com/wallpaper/894/492/7/mcdonalds-burger-hd-wallpaper-preview.jpg",
  //   },
  //   {
  //     dishName: "Smoky Hamburger",
  //     price: 8,
  //     id: "Smoky Hamburger",
  //     image:
  //       "https://c4.wallpaperflare.com/wallpaper/894/492/7/mcdonalds-burger-hd-wallpaper-preview.jpg",
  //   },
  //   {
  //     dishName: "Shared Hamburger",
  //     price: 8,
  //     id: "Shared Hamburger",
  //     image:
  //       "https://c4.wallpaperflare.com/wallpaper/894/492/7/mcdonalds-burger-hd-wallpaper-preview.jpg",
  //   },
  // ];
  const cartCtx = useContext(CartContext);
  const addToCartHandler = (item) => {
    cartCtx.addItem({
      id: item._id,
      name: item.title,
      amount: 1,
      price: +item.price,
      image: item.imageUrl,
    });
    addToCart = true;
    graphqlQuery = {
      query: ` mutation {
          addProduct(id: "${item._id}") 
               
          }`,
    };
    firstTimeFunction(graphqlQuery);
  };
  const firstTimeFunction = (graphqlQuery) => {
    fetch("https://thefoodtruck.herokuapp.com/graphql", {
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
        if (!addToCart) {
          arrayItem = resData.data.products.products;
          setFetched(true);
        }
      });
  };
  let graphqlQuery = {
    query: `mutation {
            createProduct(productInput: {title:"Smoky Hamburger", description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit reiciendis nam non quia! Earum eveniet minus.", price : 9,veg:"true", imageUrl:"https://c4.wallpaperflare.com/wallpaper/894/492/7/mcdonalds-burger-hd-wallpaper-preview.jpg"}) {
                _id
                title
               
            }
          }`,
  };

  // firstTimeFunction(graphqlQuery);
  graphqlQuery = {
    query: ` {
            products {
              products{
                 _id
                title
                 description
                imageUrl
                price
                
              }
               
            }
          }`,
  };
  firstTimeFunction(graphqlQuery);
  return (
    <div className={classes.overallCont}>
      <div className={classes.menu}>
        <div className={classes.heading}>
          <h3> MENU </h3>
        </div>

        {arrayItem &&
          arrayItem.map((item) => (
            <div className={classes.indFoodItem}>
              <img src={item.imageUrl} alt="food pictur"/>
              <div className={classes.itemDetails}>
                <div className={classes.namePriceFlex}>
                  <h2>{item.title}</h2>
                  <h2 className={classes.price}> ${item.price}</h2>
                </div>
                <p>{item.description}</p>
                <button onClick={addToCartHandler.bind(null, item)}>
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Menu;
