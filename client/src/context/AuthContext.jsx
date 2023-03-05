import { useEffect } from 'react';
import { createContext, useReducer } from 'react';

export const AuthContext = createContext();

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
  const user = JSON.parse( localStorage.getItem('user'));
  useEffect(() => {
    if (user) {
      dispatch({ type: 'LOGIN', payload: user });
    }
  }, []);
  const [state, dispatch] = useReducer(authReducer,{
    user: user,
  });
  console.log(state)
  return <AuthContext.Provider value={{ ...state, dispatch }}>{props.children}</AuthContext.Provider>;
};
