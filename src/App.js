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

import { auth, createUserProfileDocument,addCollectionAndDocuments } from "./firebase/firebase.utils.js";

import {setCurrentUser} from './redux/user/user.actions.js';
import {selectCurrentUser} from './redux/user/user.selectors.js';
// import {selectCollectionsForPreview} from './redux/shop/shop.selectors';

class App extends React.Component {
 
  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser, collectionsArray} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        //if snapcpt changed - snoaphot autoaticaly ubsubscribes after beint called, yes?
        userRef.onSnapshot(snapShot => {

        //  this.props.setCurrentUser({
        //     id: snapShot.id,
        //     ...snapShot.data()
        // });        
         setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
        });

          console.log(this.state);
        });
      }
      setCurrentUser(userAuth);

      // because we dont want our ids we want the other ids
      // addCollectionAndDocuments('collections',collectionsArray.map(({title,items})=>({title,items})));
    });
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
  // collectionsArray:selectCollectionsForPreview
})

const mapDispatchToProps = dispatch =>({
  //dispatch take an action object to be dispatched to every reducer - in this case the connect allow us to o props.dispatch and then disptch the acion which takes an argument,
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
