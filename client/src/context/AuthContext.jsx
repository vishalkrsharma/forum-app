import { useEffect } from 'react';
import { createContext, useReducer } from 'react';

export const AuthContext = createContext();

const initialState = {
  user: null,
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN': {
      return { user: action.payload };
    }
    case 'LOGOUT': {
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
      dispatch({ type: 'LOGIN', payload: user });
    }
  }, []);
  console.log(state)
  return <AuthContext.Provider value={{ ...state, dispatch }}>{props.children}</AuthContext.Provider>;
};
