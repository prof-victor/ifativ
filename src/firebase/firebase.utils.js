import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCUy0_no9Y8znFJdR860fG_Cw3xUud53Bc",
  authDomain: "ifativ.firebaseapp.com",
  projectId: "ifativ",
  storageBucket: "ifativ.appspot.com",
  messagingSenderId: "281727825456",
  appId: "1:281727825456:web:a47ca1ddd49a36dabc1ff5",
  measurementId: "G-PKC1PMY93D",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider(); //Google Autenticantion
provider.setCustomParameters({ prompt: "select_account" }); //aciona o Google pop-up para autenticação
export const signInWithGoogle = () => auth.signInWithPopup(provider); //seleciona o tipo de pop-up, nesse caso, o Google

export default firebase;
