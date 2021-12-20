import  {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {compose} from 'redux';




const mapStateToProps = createStructuredSelector({
    cartItems: !!selectCartItems
  });