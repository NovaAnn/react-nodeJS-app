import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import CartButton from "./components/Layout/CartButton";
import CartModal from "./components/Layout/CartModal";
import UserProfile from "./components/Profile/UserProfile";
import Menu from "./components/Profile/Menu";
import PreviousOrders from "./components/Profile/PreviousOrders";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AuthContext from "./store/auth-context";
import CartContext from "./store/cart-context";

function App() {
  console.log("Inside App");
  const authCtx = useContext(AuthContext);


  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          {authCtx.isLoggedIn && <UserProfile />}
          {!authCtx.isLoggedIn && <HomePage />}
        </Route>
        {!authCtx.isLoggedIn && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}
        <Route path="/profile">
          {authCtx.isLoggedIn && <UserProfile />}
          {!authCtx.isLoggedIn && <Redirect to="/auth" />}
        </Route>
        <Route path="/menu">
          {authCtx.isLoggedIn && <Menu />}
          {!authCtx.isLoggedIn && <Redirect to="/auth" />}
        </Route>

        <Route path="/meals/:mealId">
          {authCtx.isLoggedIn && <Menu />}
          {!authCtx.isLoggedIn && <Redirect to="/auth" />}
        </Route>
        <Route path="/previousOrders">
          {authCtx.isLoggedIn && <PreviousOrders />}
          {!authCtx.isLoggedIn && <Redirect to="/auth" />}
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
