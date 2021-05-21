import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import React, { useEffect, useState, createContext } from "react";

/* const config = {
  apiKey: "AIzaSyCUy0_no9Y8znFJdR860fG_Cw3xUud53Bc",
  authDomain: "ifativ.firebaseapp.com",
  projectId: "ifativ",
  storageBucket: "ifativ.appspot.com",
  messagingSenderId: "281727825456",
  appId: "1:281727825456:web:a47ca1ddd49a36dabc1ff5",
  measurementId: "G-PKC1PMY93D",
}; */

const config = {
  apiKey: "AIzaSyD7S8SJtgwbnyzWi1CWE5wIu3YjT_EfHuM",
  authDomain: "ifativ2.firebaseapp.com",
  projectId: "ifativ2",
  storageBucket: "ifativ2.appspot.com",
  messagingSenderId: "819992546669",
  appId: "1:819992546669:web:6d6b10c99f19da87289e64",
  measurementId: "G-6TKQQKE7CY",
};

export const createUserProfileDoc = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const usuarioRef = firestore.doc(`usuarios/${userAuth.uid}`); //localização do usuário
  const snapShot = await usuarioRef.get(); //pega os dados do usuário

  //Cria usuário
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const criacao = new Date();

    try {
      await usuarioRef.set({
        displayName,
        email,
        mediador: false,
        admin: false,
        criacao,
        ...additionalData,
      });
      //Fim cria usuário
    } catch (error) {
      console.log("erro ao criar usuário", error.message);
    }
  }
  //console.log(userRef);
  return usuarioRef; //retorna tudo(displayName, email, createdAt, etc...) para userRef
};

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const { children } = props;
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUsuario(user);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <AuthContext.Provider value={{ usuario }}>{children}</AuthContext.Provider>
  );
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const increment = firebase.firestore.FieldValue.increment;
export const FieldValue = firebase.firestore.FieldValue;

const provider = new firebase.auth.GoogleAuthProvider(); //Google Autenticantion
provider.setCustomParameters({ prompt: "select_account" }); //aciona o Google pop-up para autenticação
export const signInWithGoogle = () => auth.signInWithPopup(provider); //seleciona o tipo de pop-up, nesse caso, o Google

export default firebase;
