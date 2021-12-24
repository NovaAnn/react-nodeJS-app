import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";

import AuthContext from "../../store/auth-context";
import classes from "./AuthForm.module.css";
let inputValue;
let graphqlQuery;
const AuthForm = (props) => {
  const history = useHistory();
  const emailInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const passwordInputRef = useRef();
  if (props.emailId) {
    inputValue = props.emailId;

    setIsLogin(false);
  } else {
    inputValue = "";
  }
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // optional: Add validation

    setIsLoading(true);
    let url;
    if (isLogin) {
      graphqlQuery = {
        query: ` query {
          login(email:"${enteredEmail}",
            password:"${enteredPassword}") {
                token
                userId
        } 
            
               
          }`,
      };
    } else {
      graphqlQuery = {
        query: `mutation {
            createUser(userInput: {email:"${enteredEmail}", password:"${enteredPassword}"}) {
                token
                userId
               
            }
          }`,
      };
    }
    

    fetch("https://thefoodtruck.herokuapp.com/graphql", {
      method: "POST",
      body: JSON.stringify(graphqlQuery),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        return res.json();
      })
      .then((resData) => {
        if (resData.data) {
          const expirationTime = new Date(new Date().getTime() + 3600 * 1000);
          if (isLogin) {
            authCtx.login(
              resData.data.login.token,
              expirationTime.toISOString()
            );
          } else {
            authCtx.login(
              resData.data.createUser.token,
              expirationTime.toISOString()
            );
          }
          history.replace("/");
        }
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
