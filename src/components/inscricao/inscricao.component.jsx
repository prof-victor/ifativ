import React, { useEffect, useState } from "react";
import "./inscricao.styles.scss";
import {
  firestore,
  auth,
  increment,
  FieldValue,
} from "../../firebase/firebase.utils";
import CustomButton from "../custom-button/custom-button.component";
import { Ring } from "react-spinners-css";

const Inscricao = () => {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(null);
  const [atividades, setAtividades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = async () => {
      const ref = await firestore.collection("atividades").get();
      const snapshot = ref.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAtividades(snapshot);
      setLoading(false);
    };

    return unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        setUsuarioAutenticado(userAuth);
      }
    });

    return unsubscribe();
  }, []);

  const handleSubmit = async (id) => {
    const usuarioInscritoRef = firestore.doc(
      `usuarios/${usuarioAutenticado.uid}/inscritos/${id}`
    );
    const snapshot = await usuarioInscritoRef.get();
    const ref = firestore.doc(`atividades/${id}`);

    const decrement = increment(-1);

    if (!snapshot.exists) {
      //console.log("Não existe");
      await ref
        .update({
          vaga: decrement,
        })
        .catch((error) => console.log("Erro: ", error.message));

      await usuarioInscritoRef
        .set({}, { merge: true })
        .catch((error) => console.log("Erro: ", error.message));

      await ref.update({
        inscritos: FieldValue.arrayUnion({
          label: usuarioAutenticado.displayName,
          value: usuarioAutenticado.uid,
        }),
      });
      alert("Inscrição realizada com sucesso!");
    } else {
      alert("Você já está inscrito(a) nesta atividade!");
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Atividades para inscrição:</h2>
      {!loading ? (
        <div className="container">
          {atividades.map(
            ({
              id,
              eventoId,
              titulo,
              mediador,
              descricao,
              data,
              horario,
              vaga,
              local,
            }) => (
              <div className="cards" key={id} style={{ textAlign: "center" }}>
                <div className="titulo">{titulo.toUpperCase()}</div>
                <div>{mediador.toUpperCase()}</div>
                <div className="descricao" style={{ textAlign: "justify" }}>
                  {descricao}
                </div>
                <div>{data}</div>
                <div>{horario}</div>
                <div>{vaga} vagas restantes</div>
                <div>{local}</div>
                <div style={{ textAlign: "center" }}>
                  {vaga > 0 ? (
                    <CustomButton
                      type="submit"
                      onClick={() => handleSubmit(id, eventoId)}
                    >
                      Inscrever
                    </CustomButton>
                  ) : (
                    <CustomButton type="submit" disabled>
                      Esgotada
                    </CustomButton>
                  )}
                </div>
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
export default Inscricao;
