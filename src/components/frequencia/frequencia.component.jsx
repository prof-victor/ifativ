import React, { useEffect, useState, useContext } from "react";
import { firestore, AuthContext } from "../../firebase/firebase.utils";
import { Icon } from "semantic-ui-react";
import CustomButton from "../custom-button/custom-button.component";
import MultiSelect from "react-multi-select-component";

const Frequencia = () => {
  const { usuario } = useContext(AuthContext);
  const [listaFrequencias, setListaFrequencias] = useState([]);
  const [gravaFrequencias, setGravaFrequencias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = async () => {
      const ref = await firestore
        .collection("atividades")
        .where("mediador", "==", usuario.displayName)
        .get();

      const snapshot = ref.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setListaFrequencias(snapshot);
      setLoading(false);
    };

    return unsubscribe();
  });

  const handleSubmit = async (id) => {
    const ref = firestore.doc(`atividades/${id}`);
    await ref.update({
      presentes: gravaFrequencias,
    });
  };

  return (
    <div>
      <div className="titulo-text">
        Atividades em que você é mediador(a) para verificar a frequência:&nbsp;
      </div>
      {!loading ? (
        <form>
          <div className="container">
            {listaFrequencias.map(({ id, titulo, mediador, inscritos }) => (
              <div className="cards" key={id}>
                <div className="titulo">
                  {titulo.toUpperCase()}
                  <div>Mediador(a): {mediador}</div>
                </div>
                <div style={{ color: "black" }}>
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
        <div style={{ textAlign: "center" }}>
          <Icon loading name="spinner" size="huge" color="green" />
        </div>
      )}
    </div>
  );
};

export default Frequencia;
