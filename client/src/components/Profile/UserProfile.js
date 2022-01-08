import ProfileForm from "./ProfileForm";
import { useState, useEffect, Fragment,useContext } from "react";
import classes from "./UserProfile.module.css";
import { Link } from "react-router-dom";

let itemsArray = [
  {
    url: "https://ak.picdn.net/shutterstock/videos/1004461/thumb/1.jpg",
    name: "Wood Fired Pizza",
    shortName: "pizza",
    love: 90,
  },
  {
    url: "https://lh3.googleusercontent.com/VjN5ueR1sBLFXXI4I_2GdjkESMhfvvvoTD6jtTxFsXsDanum85bMZa-hNaY6r7uO2F1LLnd3OUdH--stkLlMz28AKLoW=w1000",
    name: "Biriyani",
    shortName: "biriyani",
    love: 85,
  },
  {
    url: "https://swall.teahub.io/photos/small/128-1287412_dessert-hd-desserts-backgrounds.jpg",
    name: "Desserts",
    shortName: "desserts",
    love: 87,
  },
];
let afterSlide;
let previousSlide;

const UserProfile = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const buttonClickHandler = (e) => {
    const target = e.target;

    if (target.dataset.span == 0) {
      if (+currentPage === 0) {
        setCurrentPage(itemsArray.length - 1);
      } else {
        setCurrentPage(currentPage - 1);
      }
    } else if (target.dataset.span == 1) {
      if (+currentPage === itemsArray.length - 1) {
        setCurrentPage(0);
      } else {
        setCurrentPage(currentPage + 1);
      }
    }
  };

  return (
    <Fragment>
      <div className={classes.overallCont}>
        <img
          className={classes.overallContimg}
          src="https://cdn-icons-png.flaticon.com/512/1046/1046798.png"
        />
        <div className={classes.mainCont}>
          <div
            className={classes.indFoodItem}
            style={{
              transform: `translateX(${(currentPage * -100) / 3}%)`,
            }}
          >
            {itemsArray.map((item, ind) => {
              return (
                <Link
                  className={classes.linkItem}
                  to={`/meals/${item.shortName}`}
                >
                  <div className={classes.itemDetails}>
                    <img src={item.url} />
                    <div className={classes.namePriceFlex}>
                      <h2>{item.name}</h2>
                      <h3>{item.love}% customers ♥ it </h3>
                    </div>
                    <p>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit
                      reiciendis nam non quia! Earum eveniet minus. Facilis
                      explicabo natus nihil voluptatem eveniet pariatur.
                    </p>
                  </div>
                  <button className={classes.checkoutBtn}>Checkout Menu</button>
                  <p className={classes.mainContP}>Page {ind + 1}</p>
                </Link>
              );
            })}
          </div>

          <button onClick={buttonClickHandler} data-span={0} className={classes.leftButton}>
            &lt;
          </button>
          <button onClick={buttonClickHandler} data-span={1} className={classes.rightButton}>
            &gt;
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default UserProfile;
