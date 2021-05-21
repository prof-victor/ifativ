import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
//import { connect } from "react-redux";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { auth, firestore, AuthContext } from "../../firebase/firebase.utils";

const Header = () => {
  const { usuario } = useContext(AuthContext);
  const [isMediador, setIsMediador] = useState([]);
  const [isAdmin, setIsAdmin] = useState([]);

  useEffect(() => {
    if (usuario != null) {
      const unsubscribe = async () => {
        const mediadorRef = await firestore
          .doc(`usuarios/${usuario.uid}`)
          .get();

        setIsMediador(mediadorRef.data());
      };
      return unsubscribe();
    }
  }, [usuario]);

  useEffect(() => {
    if (usuario != null) {
      const unsubscribe = async () => {
        const adminRef = await firestore.doc(`usuarios/${usuario.uid}`).get();

        setIsAdmin(adminRef.data());
      };
      return unsubscribe();
    }
  });

  return (
    <div>
      <div className="wrapper-header">
        <div className="header1">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        {usuario && isAdmin.admin === true ? (
          <div className="header2">
            <Link className="option-header" to="/inscricao">
              INSCRIÇÃO
            </Link>
            <Link className="option-header" to="/evento">
              EVENTO
            </Link>
            <Link className="option-header" to="/atividade">
              ATIVIDADE
            </Link>
          </div>
        ) : usuario && isMediador.mediador === true ? (
          <div className="header2">
            <Link className="option-header" to="/inscricao">
              INSCRIÇÃO
            </Link>
            <Link className="option-header" to="/frequencia">
              FREQUÊNCIA
            </Link>
          </div>
        ) : (
          <div className="header2">
            <Link className="option-header" to="/inscricao">
              INSCRIÇÃO
            </Link>
          </div>
        )}
        <div className="header3">
          {usuario ? (
            <Link
              className="login-logoff"
              onClick={() => auth.signOut()}
              to="signin-signup"
            >
              Sair
              {/*usuario.displayName.split(" ")[0]*/}
            </Link>
          ) : (
            <Link className="login-logoff" to="signin-signup">
              Entrar
            </Link>
          )}
        </div>
      </div>
      <div className="wrapper-status">
        <div className="campus"> Campus Paracambi</div>
        <div className="versao"> versão 0.11</div>
        {usuario ? (
          <div className="usuario">{usuario.displayName}</div>
        ) : (
          <div className="usuario">Offline</div>
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
