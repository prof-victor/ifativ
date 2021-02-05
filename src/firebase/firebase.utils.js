import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCUy0_no9Y8znFJdR860fG_Cw3xUud53Bc",
  authDomain: "ifativ.firebaseapp.com",
  projectId: "ifativ",
  storageBucket: "ifativ.appspot.com",
  messagingSenderId: "281727825456",
  appId: "1:281727825456:web:a47ca1ddd49a36dabc1ff5",
  measurementId: "G-PKC1PMY93D",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  //console.log(firestore.doc('users/abcd1234'));

  const userRef = firestore.doc(`users/${userAuth.uid}`); //localização do usuário
  const snapShot = await userRef.get(); //pega os dados do usuário

  //console.log(snapShot);

  //Cria usuário
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
  //Fim cria usuário
    } catch (error) {
      console.log("erro ao criar usuário", error.message);
    }
  }
  //console.log(userRef);
    return userRef; //retorna tudo(displayName, email, createdAt, etc...) para userRef
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider(); //Google Autenticantion
provider.setCustomParameters({ prompt: "select_account" }); //aciona o Google pop-up para autenticação
export const signInWithGoogle = () => auth.signInWithPopup(provider); //seleciona o tipo de pop-up, nesse caso, o Google

export default firebase;