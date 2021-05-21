import React, { useEffect, useState } from "react";
//import { ReactComponent as Logo } from "../../assets/logo.svg";
import { firestore, auth } from "../../firebase/firebase.utils";
//import "./header.styles.scss";

const Certificado = () => {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [certificados, setCertificados] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        setUsuarioAutenticado(userAuth);
      }
    });

    const unsubscribe = async () => {
      const ref = await firestore.collection("atividades").get();
      const snapshot = ref.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCertificados(snapshot);
      setLoading(false);
    };

    return unsubscribe();
  });

  return (
    <div align="center">
      <div className="titulo-text">CERTIFICADO</div>
      <div style={{ fontSize: "30px", lineHeight: "150%" }}>
        Certificamos que: <br />
        {certificados.map(({ presentes }) =>
          Object.values(presentes).map(({ label }) => <div>{label}</div>)
        )}
        participou do (Nome do Evento), no dia 26 de maio de 2021,
        <br />
        no Instituto Federal de Educação, Ciência e Tecnologia do Rio de Janeiro
        -
        <br />
        Campus Paracambi, com carga horária de 10 horas.
        <br />
        Paracambi, 26 de Abril de 2021.
      </div>
    </div>
  );
};

export default Certificado;
