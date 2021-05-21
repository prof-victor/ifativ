import React, { useEffect, useState } from "react";
import { firestore } from "../../firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { Icon } from "semantic-ui-react";

const CadastroEventos = () => {
  const estadoInicialEventos = {
    id: "",
    nome: "",
  };

  const [eventosUsuario, setEventosUsuario] = useState([]);
  const [eventos, setEventos] = useState(estadoInicialEventos);
  const [loading, setLoading] = useState(true);

  const { id, nome } = eventos;

  useEffect(() => {
    const unsubscribe = async () => {
      const eventosRef = await firestore.collection("eventos").get();

      const snapshot = eventosRef.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEventosUsuario(snapshot);

      setLoading(false);
    };

    return unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventos({ ...eventos, [name]: value });
  };

  const EventoAdd = async (e) => {
    e.preventDefault();
    const eventosRef = firestore.collection("eventos");
    try {
      await eventosRef.add({
        nome: nome,
      });
      setEventos(estadoInicialEventos);
      alert("Evento criado com sucesso!");
    } catch (error) {
      alert("erro ao criar evento", error.message);
    }
  };

  const EventoDelete = async (id) => {
    const eventosIdRef = firestore.doc(`eventos/${id}`);
    await eventosIdRef.delete();
    alert("Evento excluído com sucesso!");
  };

  const selecionaEvento = (id, nome) => {
    setEventos({
      id: id,
      nome: nome,
    });
  };

  const EventoUpdate = async () => {
    const eventoIdRef = firestore.doc(`eventos/${id}`);

    await eventoIdRef.update({ nome: nome });

    setEventos(estadoInicialEventos);
    alert("Evento atualizado com sucesso!");
  };

  return (
    <div>
      <div>
        <form onSubmit={EventoAdd}>
          <div className="titulo-text">Cadastro de Eventos</div>
          <FormInput
            type="text"
            name="nome"
            value={nome}
            onChange={handleChange}
            label="Nome"
            maxLength="100"
            placeholder="Máx 100 caracteres"
          />
          <br />
          <CustomButton type="submit">Cadastrar Novo Evento</CustomButton>
        </form>
        <br />

        {!loading ? (
          <div className="container">
            {eventosUsuario.map(({ id, nome }) => (
              <div
                className="cards"
                key={id}
                onClick={() => selecionaEvento(id, nome)}
              >
                <div className="titulo">{nome.toUpperCase()}</div>
                <br />
                <div style={{ textAlign: "center" }}>
                  <Icon
                    className="edit-delete-icons"
                    name="edit"
                    size="big"
                    type="submit"
                    onClick={() => EventoUpdate(id)}
                  />
                  <Icon
                    className="edit-delete-icons"
                    name="delete"
                    size="big"
                    type="submit"
                    onClick={() => EventoDelete(id)}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <Icon loading name="spinner" size="huge" color="green" />
          </div>
        )}
      </div>
    </div>
  );
};

export default CadastroEventos;
