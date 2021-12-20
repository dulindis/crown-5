import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import {connect} from 'react-redux';
import { createStructuredSelector } from "reselect";

import "./App.css";

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';
import Header from "./components/header/header.component.jsx";

import {selectCurrentUser} from './redux/user/user.selectors.js';
import {checkUserSession} from './redux/user/user.actions';

class App extends React.Component {
 
  unsubscribeFromAuth = null;

  componentDidMount() {
    const {checkUserSession} = this.props;
    checkUserSession()
  };

  componentWillUnmount() {
    this.unsubscribeFromAuth = null;
  }

  render() {
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
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />          </Switch>
        </BrowserRouter>
      </div>
    );
  }
};

const mapStateToProps = createStructuredSelector({
  currentUser:selectCurrentUser,
});
const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
