import React from "react";

import { Routes,Route } from "react-router-dom";

import Header from "./components/header";
import Home from "./page/home";
import Cart from "./page/cart";

import { CartPizzaInfo } from "./page/cartPizzaInfo";

function App() {
  
  return (
    <>
      <div className="wrapper">
          <Header />
          <Routes>
            <Route path = "/" element = {<Home  />}></Route>
            <Route path = "/cart" element = {<Cart />}></Route>
            <Route path="/pizza/:id"element ={<CartPizzaInfo/>}></Route>
          </Routes>
      </div>
      
    </>
  );
}

export default App;
