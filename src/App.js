import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {connect} from 'react-redux';

import {setCurrentUser} from './redux/user/user.actions.js';

import "./App.css";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils.js";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component.jsx";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from "./components/header/header.component.jsx";

class App extends React.Component {
 
  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        //if snapcpt changed
        userRef.onSnapshot(snapShot => {

        //  this.props.setCurrentUser({
        //     id: snapShot.id,
        //     ...snapShot.data()
        // });        
         setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
        });

          // this.setState({
          //   currentUser: {
          //     id: snapShot.id,
          //     ...snapShot.data()
          //   }
          // });

          console.log(this.state);
        });
      }
      setCurrentUser(userAuth);
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
            <Route path="/shop" component={ShopPage} />
            <Route path="/signin" component={SignInAndSignUpPage} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
};

const mapDispatchToProps = dispatch =>({
  //dispatch take an action object to be dispatched to every reducer
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App);
