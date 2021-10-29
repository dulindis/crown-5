import { UserActionTypes } from './user.types';


const INITIAL_STATE = {
    currentUser: null
  };
  //since null is an actual value the state wont crash
  const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case UserActionTypes.SET_CURRENT_USER:
        // we could alsow ih psos fiter because its a nondesructive method
        return {
          ...state,
          currentUser: action.payload
        };
      default:
        return state;
    }
  };
  
  export default userReducer;