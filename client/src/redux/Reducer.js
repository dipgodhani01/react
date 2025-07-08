import * as types from "./ActionType";

const initialstate = {
  user: null,
};

const userReducres = (state = initialstate, action) => {
  
  switch (action.type) {
    case types.SIGN_UP:
      return {
        ...state,
      };
    case types.SIGN_IN:
      return {
        ...state,
        user: {
          ...action.payload,
          isLogin: true,
        },
      };
    case types.GET_USER:
      return {
        ...state,
        user: action.payload,
      };
      case types.LOGOUT_USER:
        return {
          ...state,
          user: null
        }

    default:
      return state;
  }
};

export default userReducres;
