import React, { useEffect, useState, useContext } from "react";
import {
  firestore,
  increment,
  FieldValue,
  AuthContext,
} from "../../firebase/firebase.utils";
import CustomButton from "../custom-button/custom-button.component";
import { Icon } from "semantic-ui-react";

const Inscricao = () => {
  const { usuario } = useContext(AuthContext);
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

  const handleSubmit = async (id) => {
    const usuarioInscritoRef = firestore.doc(
      `usuarios/${usuario.uid}/inscritos/${id}`
    );
    const snapshot = await usuarioInscritoRef.get();
    const ref = firestore.doc(`atividades/${id}`);

    const decrement = increment(-1);

    if (!snapshot.exists) {
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
          label: usuario.displayName,
          value: usuario.uid,
        }),
      });
      alert("Inscrição realizada com sucesso!");
    } else {
      alert("Você já está inscrito(a) nesta atividade!");
    }
  };

  return (
    <div>
      <div className="titulo-text">Atividades para inscrição:</div>
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
        <div style={{ textAlign: "center" }}>
          <Icon loading name="spinner" size="huge" color="green" />
        </div>
      )}
    </div>
  );
};
export default Inscricao;
