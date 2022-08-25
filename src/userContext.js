import React, { useState } from "react";

export const AuthContext = React.createContext(null);

const initialState = {
  isUser: false,
  user: null,
  jwt: null,
};

export const ContextProvider = (props) => {
  const [state, setState] = useState(initialState);

  const login = (user, jwt) => {
    setState({ ...state, isUser: true, user, jwt });
  };

  const logout = () => {
    setState({ ...state, isUser: false, user: null, jwt: null });
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
