import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { auth, createUserProfileDoc } from "./firebase/firebase.utils";
//import { connect } from "react-redux";
//import { setCurrentUser } from "./redux/user/user.actions";
import Header from "./components/header/header.component";
import SignInSignUpPage from "./pages/signin-signup/signin-signup.page";
import HomePage from "./pages/homepage/homepage";
import CadastroEventosPage from "./pages/evento/cadastro-eventos.page";
import CadastroAtividadesPage from "./pages/atividade/cadastro-atividades.page";
import InscricaoPage from "./pages/inscricao/inscricao.page";
import FrequenciaPage from "./pages/frequencia/frequencia.page";
import CertificadoPage from "./pages/certificado/certificado.page";
import { GlobalStyle } from "./global.styles";

class App extends React.Component {
  state = {
    currentUser: null,
  };

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDoc(userAuth);

        userRef.onSnapshot((snapShot) => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });
        });
      }
      this.setState({ currentUser: userAuth });
      //console.log(userAuth.uid);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    const { currentUser } = this.props;
    return (
      <div>
        <GlobalStyle />
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/evento" component={CadastroEventosPage} />
          <Route path="/atividade" component={CadastroAtividadesPage} />
          <Route path="/inscricao" component={InscricaoPage} />
          <Route path="/frequencia" component={FrequenciaPage} />
          <Route path="/certificado" component={CertificadoPage} />

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

/* const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});
 */
/* Função que pega a prop e chama o dispatch ou disparador da ação,
neste caso, a ação disparada é user do user.action identificada pelo payload
do objeto(user) que dispara a ação no Root-Reducer, neste caso, o userReducer
 */
/* const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App); */
export default App;