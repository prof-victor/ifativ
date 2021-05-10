import React, { useEffect, useState } from "react";
import { firestore } from "../../firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { Ring } from "react-spinners-css";
import "semantic-ui-css/semantic.min.css";

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
      //setLoading(true);
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
    //console.log(name + ": " + value);
  };

  const EventoAdd = async (e) => {
    //alert([titulo, mediador, data]);
    //alert(JSON.stringify(activities));
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

  //console.log(usuarios);

  return (
    <div>
      <div>
        <form onSubmit={EventoAdd}>
          <h2 style={{ textAlign: "center" }}>Cadastro de Eventos</h2>
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
                  <i
                    className="huge pencil icon edit-delete-icons"
                    type="submit"
                    onClick={() => EventoUpdate(id)}
                  />
                  <i
                    className="huge trash icon edit-delete-icons"
                    type="submit"
                    onClick={() => EventoDelete(id)}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Ring color="#2f9e41" />
        )}
      </div>
    </div>
  );
};

export default CadastroEventos;
