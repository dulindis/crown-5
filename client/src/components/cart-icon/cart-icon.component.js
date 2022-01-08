import React from 'react';
// import { connect } from 'react-redux';
import { useSelector,useDispatch} from 'react-redux';

// import { createStructuredSelector } from 'reselect';

import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

import {
  CartContainer,
  ShoppingIcon,
  ItemCountContainer
} from './cart-icon.styles';

const CartIcon = () => {

  // { toggleCartHidden, itemCount }
  const itemCount = useSelector(selectCartItemsCount);
  const dispatch = useDispatch();
  const toggleCartHiddenClickHandler = () => dispatch(toggleCartHidden());


  return(
  <CartContainer onClick={toggleCartHiddenClickHandler}>
    <ShoppingIcon />
    <ItemCountContainer>{itemCount}</ItemCountContainer>
  </CartContainer>
);}


export default CartIcon;