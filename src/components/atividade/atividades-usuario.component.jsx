import React, { useEffect, useState } from "react";
import { firestore, auth } from "../../firebase/firebase.utils";
import { Ring } from "react-spinners-css";

const AtividadesUsuario = () => {
  const [usuarioAtividades, setUsuarioAtividades] = useState([]);
  const [userState, setUserState] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadUserActivities = async () => {
      setLoading(true);

      const atividadesUsuarioRef = await firestore
        .collection("activities")
        .where("users", "array-contains", userState)
        .get();

      const snapshot = atividadesUsuarioRef.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    
      setUsuarioAtividades(snapshot);
      setLoading(false);
    };

   const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        setUserState(userAuth.uid);
        loadUserActivities();
        //alert(currentUser);
        //console.log(userState);
      } else {
        setUserState(null);
        //alert(currentUser);
        // console.log(userState);
      }
    });

    return unsubscribe();
  }, []);
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>
        Você se inscreveu nas seguintes atividades:{" "}
      </h2>
      {!loading ? (
        <div className="container">
          {usuarioAtividades.map(
            ({
              id,
              titulo,
              mediador,
              descricao,
              data,
              horario,
              vaga,
              users,
            }) => (
              <div className="cards" key={id}>
                <div className="titulo">{titulo.toUpperCase()}</div>
                <div>{mediador}</div>
                <div className="descricao">{descricao}</div>
                <div>{data}</div>
                <div>{horario}</div>
                <div>{vaga} vagas restantes</div>
              </div>
            )
          )}
        </div>
      ) : (
        <Ring color="#2f9e41" />
      )}
    </div>
  );
};

export default AtividadesUsuario;
