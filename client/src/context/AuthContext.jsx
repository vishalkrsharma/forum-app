import { useEffect } from 'react';
import { createContext, useReducer } from 'react';

export const AuthContext = createContext();

const initialState = {
  user: null,
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'USER_SIGNIN': {
      return { user: action.payload };
    }
    case 'USER_SIGNOUT': {
      return { user: null };
    }
    default: {
      return state;
    }
  }
};

export const AuthContextProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch({ type: 'USER_SIGNIN', payload: user });
    }
  }, []);

  return <AuthContext.Provider value={{ state, dispatch }}>{props.children}</AuthContext.Provider>;
};
