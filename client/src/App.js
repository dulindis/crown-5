import React, {useEffect} from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useSelector,useDispatch} from 'react-redux';

import "./App.css";

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';
import Header from "./components/header/header.component.jsx";

import {selectCurrentUser} from './redux/user/user.selectors.js';
import {checkUserSession} from './redux/user/user.actions';

const App = () => {
  const currentUser = useSelector(selectCurrentUser)
  const  dispatch = useDispatch();


  useEffect(()=>{
    dispatch(checkUserSession())
    },[dispatch])
//he ispatch doesnt change so run once 
    return (
      <div>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/checkout" component={CheckoutPage} />
            <Route path="/shop" component={ShopPage} />
            <Route
            exact
            path='/signin'
            render={() =>
              currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />          </Switch>
        </BrowserRouter>
      </div>
    );
  
};

export default App;
