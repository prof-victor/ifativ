import React, { useEffect, useState, createContext } from "react";
import { auth } from "../../firebase/firebase.utils";
import { Icon } from "semantic-ui-react";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const { children } = props;
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUsuario(user);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center" }}>
        <Icon loading name="spinner" size="huge" color="green" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ usuario }}>{children}</AuthContext.Provider>
  );
};
