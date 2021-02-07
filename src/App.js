import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";
import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
import SignInSignUpPage from "./pages/sign-in-sign-up/sign-in-sign-up.component";
import "./App.css";

class App extends React.Component {
  unsubscribeFromAuth = null;

  /* System Open Subscription é um sistema de inscrições entre 
  o app e o Firebase, sempre que yma alteração ocorrer. */

  /* Na montagem(componentDidMount) mantem o login (objeto de usuário autenticado) 
  durante todo o tempo, persistindo com a sessão de usuário até realizar o logout. 
  */
  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      //verifica se o usuário está logado
      if (userAuth) {
        //se está
        const userRef = await createUserProfileDocument(
          userAuth
        ); /*retorna a userRef o método createUserProfileDocument com o objeto userAuth
          se não existir o document(usuário), cria um novo objeto e documento, ou seja novo usuário*/

        //armazena os dados do usuário no estado
        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        //senão, o estado fica nulo, estado inicial de logoff
        setCurrentUser(userAuth);
      }
    });
  }

  /* Na desmontagem (componentWillUnmount) fecha o sistema de inscrições */
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    const { currentUser } = this.props;
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            exact
            path="/signin-signup"
            render={() =>
              currentUser ? <Redirect to="/" /> : <SignInSignUpPage />
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

/* Função que pega a prop e chama o dispatch ou disparador da ação,
neste caso, a ação disparada é user do user.action identificada pelo payload
do objeto(user) que dispara a ação no Root-Reducer, neste caso, o userReducer
 */
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
