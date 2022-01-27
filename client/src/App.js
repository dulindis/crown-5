import React, {useEffect,lazy,Suspense} from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useSelector,useDispatch} from 'react-redux';

import Header from "./components/header/header.component.jsx";
import Spinner from "./components/spinner/spinner.component.jsx";
import ErrorBoundary from './components/error-boundary/error-boundary.component';

import { GlobalStyle } from "./global.styles";

import {selectCurrentUser} from './redux/user/user.selectors.js';
import {checkUserSession} from './redux/user/user.actions';


const HomePage = lazy(()=>import( './pages/homepage/homepage.component'));
const ShopPage = lazy(()=>import( './pages/shop/shop.component'))
const CheckoutPage = lazy(()=>import('./pages/checkout/checkout.component'));
const SignInAndSignUpPage = lazy(()=>import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'));


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
        <GlobalStyle/>
          <Header />
          <Switch>
          <ErrorBoundary>
          <Suspense fallback={<Spinner/>}>
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
          /> 
                      </Suspense>
          </ErrorBoundary>
            

                   </Switch>
        </BrowserRouter>
      </div>
    );
  
};

export default App;
