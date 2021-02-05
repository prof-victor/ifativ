import React from "react";
import { Route, Switch } from "react-router-dom";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import "./App.css";
import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
import SignInSignUpPage from "./pages/sign-in-sign-up/sign-in-sign-up.component";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  /* System Open Subscription é um sistema de inscrições entre 
  o app e o Firebase, sempre que yma alteração ocorrer. */

  /* Na montagem(componentDidMount) mantem o login (objeto de usuário autenticado) 
  durante todo o tempo, persistindo com a sessão de usuário até realizar o logout. 
  */
  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => { //verifica se o usuário está logado
      if (userAuth) { //se está
        const userRef = await createUserProfileDocument(userAuth); /*retorna a userRef o método createUserProfileDocument com o objeto userAuth
          se não existir o document(usuário), cria um novo objeto e documento, ou seja novo usuário*/

        //armazena os dados do usuário no estado  
        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          }, /*console.log não pode estar depois do setState, porque ele é assíncrono, pra funcionar, deve-se passar uma segunda função
          como parâmetro, no setState, como segundo parâmetro */ 
          () => {console.log(this.state);
          }
        );
          //console.log(userAuth);
        });
      }else{//senão, o estado fica nulo, estado inicial de logoff
        this.setState({ currentUser: userAuth });
        console.log(userAuth);
      }      
    });
  }

  /* Na desmontagem (componentWillUnmount) fecha o sistema de inscrições */
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/signin-signup" component={SignInSignUpPage} />
        </Switch>
      </div>
    );
  }
}
export default App;
