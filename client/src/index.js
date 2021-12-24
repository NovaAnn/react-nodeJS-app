import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./store/auth-context";
import CartProvider from "./store/cart-provider";

ReactDOM.render(
  <AuthContextProvider>
    <CartProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CartProvider>
  </AuthContextProvider>,
  document.getElementById("root")
);
