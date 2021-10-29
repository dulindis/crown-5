import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {auth} from '../../firebase/firebase.utils.js';

import CartIcon from '../cart-icon/cart-icon.component.js';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { ReactComponent as Logo } from '../../assets/crown.svg'; //special format to import SVGs


import './header.styles.scss';
import { toggleCartHidden } from '../../redux/cart/cart.actions.js';

const Header = ({currentUser,hidden}) => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo className='logo' />
    </Link>
    <div className='options'>
      <Link className='option' to='/shop'>
        SHOP
      </Link>
      <Link className='option' to='/shop'>
        CONTACT
      </Link>
      {currentUser ? 
      <div className='option' onClick={()=>auth.signOut()}>Sign Out</div>
      :
      <Link className='option' to='/signin'>Sign In</Link>
      }
      <CartIcon/>
    </div>
   {
     hidden ? null :  <CartDropdown/>
   }
  </div>
);

//naming can be different too- the state object passed into it is a roo reducer
const mapStateToProps = ({user:{currentUser},cart:{hidden}}) => ({
  currentUser,
  hidden
});

export default connect(mapStateToProps)(Header);