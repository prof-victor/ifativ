import React, { useEffect, useState } from "react";
import { firestore, auth } from "../../firebase/firebase.utils";
import { Ring } from "react-spinners-css";
import CustomButton from "../custom-button/custom-button.component";
import MultiSelect from "react-multi-select-component";

const Frequencia = () => {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(null);
  const [listaFrequencias, setListaFrequencias] = useState([]);
  const [gravaFrequencias, setGravaFrequencias] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        setUsuarioAutenticado(userAuth);
      }
    });

    return unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = async () => {
      const ref = await firestore
        .collection("atividades")
        .where("mediador", "==", usuarioAutenticado)
        .get();

      const snapshot = ref.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setListaFrequencias(snapshot);
    };

    return unsubscribe();
  }, [usuarioAutenticado]);

  const handleSubmit = async (id) => {
    const ref = firestore.doc(`atividades/${id}`);
    await ref.update({
      presentes: gravaFrequencias,
    });

    //alert(JSON.stringify(listaFrequencias));
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>
        Atividades em que você é mediador(a) para verificar a frequência:&nbsp;
      </h2>
      {!loading ? (
        <form>
          <div className="container">
            {listaFrequencias.map(({ id, titulo, mediador, inscritos }) => (
              <div className="cards" key={id}>
                <div className="titulo">
                  {titulo.toUpperCase()}
                  <div>Mediador(a): {mediador}</div>
                </div>
                <div>
                  <MultiSelect
                    options={inscritos}
                    onChange={setGravaFrequencias}
                    value={gravaFrequencias}
                    disableSearch={true}
                    overrideStrings={{
                      selectAll: "Selecionar Tudo",
                      selectSomeItems: "Registrar Frequência...",
                      allItemsAreSelected: "Todos os itens estão selecionados.",
                    }}
                  />
                </div>
                <CustomButton type="submit" onClick={() => handleSubmit(id)}>
                  Gravar Frequências
                </CustomButton>
              </div>
            ))}
          </div>
        </form>
      ) : (
        <div>
          <Ring color="#2f9e41" />
        </div>
      )}
    </div>
  );
};

export default Frequencia;
