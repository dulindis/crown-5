import {createSelector} from 'reselect';
//input selector
const selectCart = state => state.cart;
//output selector takes an arrya of input selectors and the funtion as apramterw ill ge tas paramtere each output of the input selecor in prper order - this is memoie seleco
export const selectCartItems = createSelector(
    [selectCart],
    (cart)=>cart.cartItems
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems =>  cartItems.reduce((accumulatedQuantity , cartItem)=>( accumulatedQuantity + cartItem.quantity),0)

)
//our output is rhe reduce call on this 
