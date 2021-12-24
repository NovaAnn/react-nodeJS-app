import { Fragment, useEffect, useState } from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import Item from "../components/StartingPage/Item";
import classes from "../components/StartingPage/Item.module.css";


const MealsPage = () => {

  const match = useRouteMatch();
  const params = useParams();
  let objArray1 = [];
  const [objArray, setObjArray] = useState([]);
  const { mealId } = params;


  useEffect(() => {
    objArray1 = [];
    const fetchData = async function () {
      const res = await fetch(
        `https://actual-react-project-default-rtdb.firebaseio.com/meals/${mealId}.json`
      );
      const responseData = await res.json();
      for (const key in responseData) {
        const eachObj = {
          id: key,
          amount: 1,
          ...responseData[key],
        };
        objArray1.push(eachObj);
      }
      setObjArray(objArray1);
    };
    fetchData();
  }, [mealId]);


  return (
    <Fragment>
      <div className={classes.mainDiv}>
        {objArray.map((obj) => {
          return <Item data={obj} />;
        })}
      </div>
    </Fragment>
  );
};

export default MealsPage;
