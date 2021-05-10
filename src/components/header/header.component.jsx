import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import { connect } from "react-redux";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { auth, firestore } from "../../firebase/firebase.utils";
import "./header.styles.scss";

const Header = ({ currentUser, userAuth }) => {
  const [isMediador, setIsMediador] = useState(false);
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(null);
  //const [usuarioAutenticadoName, setUsuarioAutenticadoName] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        setUsuarioAutenticado(userAuth);
      }
    });

    return unsubscribe();
  }, []);

  useEffect(() => {
    if (usuarioAutenticado != null) {
      const unsubscribe = async () => {
        await firestore
          .doc(`usuarios/${usuarioAutenticado.uid}`)
          .get()
          .then((doc) => {
            if (doc.exists) {
              setIsMediador(doc.data());
            } else {
              console.log("Usuário não é Mediador(a)", usuarioAutenticado.uid);
            }
          });
      };

      return unsubscribe();
    }
  }, [usuarioAutenticado]);

  const { mediador } = isMediador;
 
  return (
    <div className="header">
      <Link className="logo-container" to="/">
        <Logo />
      </Link>
      <div className="options">
        <Link className="option" to="/evento">
          EVENTO
        </Link>
        <Link className="option" to="/atividade">
          ATIVIDADE
        </Link>
        <Link className="option" to="/inscricao">
          INSCRIÇÃO
        </Link>
        {mediador === true ? (
          <Link className="option" to="/frequencia">
            FREQUÊNCIA
          </Link>
        ) : null}
        {currentUser ? (
          <div className="option" onClick={() => auth.signOut()}>
            SAIR
          </div>
        ) : (
          <Link className="option" to="/signin-signup">
            ENTRAR
          </Link>
        )}
        {usuarioAutenticado ? (
          <div className="circle-with-text">
            {usuarioAutenticado.displayName.split(" ")[0]}
          </div>
        ) : (
          <div className="circle-with-text">Faça o Login</div>
        )}
      </div>
    </div>
  );
};

/* 
Retorna uma parte especificada do state atual, neste caso,
acessa o state currentUser como uma Prop, dentro do componente header
*/

export default Header;
/* const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Header); */
