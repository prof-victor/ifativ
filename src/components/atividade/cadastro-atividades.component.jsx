import React, { useEffect, useState } from "react";
import { firestore } from "../../firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { Icon } from "semantic-ui-react";
import "../../styles/styles.scss";

const CadastroAtividades = () => {
  const estadoInicialAtividades = {
    id: "",
    eventoId: "",
    titulo: "",
    mediador: "",
    descricao: "",
    data: "",
    horario: "",
    vaga: "",
    local: "",
  };

  const [atividadesUsuario, setAtividadesUsuario] = useState([]);
  const [atividades, setAtividades] = useState(estadoInicialAtividades);
  const [eventos, setEventos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [localSelecionado, setLocalSelecionado] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    id,
    eventoId,
    titulo,
    mediador,
    descricao,
    data,
    horario,
    vaga,
    local,
  } = atividades;

  const estadoAtividades = {
    eventoId: eventoId,
    titulo: titulo,
    mediador: mediador,
    descricao: descricao,
    data: data,
    horario: horario,
    vaga: vaga,
    local: local,
  };

  useEffect(() => {
    const unsubscribe = async () => {
      const eventosRef = await firestore.collection("eventos").get();

      const snapshot = eventosRef.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEventos(snapshot);

      const atividadesRef = await firestore.collection("atividades").get();

      const snapshot1 = atividadesRef.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAtividadesUsuario(snapshot1);

      const locaisRef = await firestore.collection("locais").get();

      const snapshot2 = locaisRef.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLocalSelecionado(snapshot2);

      const usuariosRef = await firestore
        .collection("usuarios")
        .where("mediador", "==", true)
        .get();

      const snapshot3 = usuariosRef.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsuarios(snapshot3);

      setLoading(false);
    };

    return unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAtividades({ ...atividades, [name]: value });
  };

  const AtividadeAdd = async (e) => {
    e.preventDefault();

    const atividadesRef = firestore.collection("atividades");
    try {
      await atividadesRef.add({
        eventoId: atividades.eventoId,
        titulo: titulo,
        mediador: mediador,
        descricao: descricao,
        data: data,
        horario: horario,
        vaga: parseInt(vaga),
        local: local,
      });
      setAtividades(estadoInicialAtividades);
      alert("Atividade criada realizada com sucesso!");
    } catch (error) {
      alert("erro ao criar atividade", error.message);
    }
  };

  const AtividadeDelete = async (id) => {
    const activitiesIdRef = firestore.doc(`atividades/${id}`);
    await activitiesIdRef.delete();
    alert("Atividade excluída com sucesso!");
  };

  const SelecionaAtividade = (
    id,
    eventoId,
    titulo,
    mediador,
    descricao,
    data,
    horario,
    vaga,
    local
  ) => {
    setAtividades({
      id: id,
      eventoId: eventoId,
      titulo: titulo,
      mediador: mediador,
      descricao: descricao,
      data: data,
      horario: horario,
      vaga: vaga,
      local: local,
    });
  };

  const AtividadeUpdate = async () => {
    const activitiesIdRef = firestore.doc(`atividades/${id}`);

    await activitiesIdRef.update(estadoAtividades);

    setAtividades(estadoInicialAtividades);
    alert("Atividade atualizadaa com sucesso!");
  };

  return (
    <div>
      {!loading ? (
        <div>
          <form onSubmit={AtividadeAdd}>
            <div className="titulo-text">Cadastro de Atividades</div>
            <label>Selecione o evento: </label>
            <select name="eventoId" onChange={handleChange} required>
              <option></option>
              {eventos.map(({ id, nome }) => (
                <option key={id} value={id}>
                  {nome}
                </option>
              ))}
            </select>
            <br />
            <FormInput
              type="text"
              name="titulo"
              value={titulo}
              onChange={handleChange}
              label="Título"
              maxLength="100"
              placeholder="Máx 100 caracteres"
            />
            <label>Selecione o(a) mediador(a): </label>
            <select name="mediador" onChange={handleChange} required>
              <option></option>
              {usuarios.map(({ id, displayName }) => (
                <option key={id} value={displayName}>
                  {displayName}
                </option>
              ))}
            </select>
            <br />
            <label>Descrição: </label>
            <textarea
              name="descricao"
              value={descricao}
              rows="4"
              maxLength="300"
              placeholder="Máx 300 caracteres"
              onChange={handleChange}
            />
            <FormInput
              type="date"
              name="data"
              value={data}
              onChange={handleChange}
              label="Data"
            />
            <FormInput
              type="time"
              name="horario"
              value={horario}
              onChange={handleChange}
              label="Horário:"
            />
            <FormInput
              type="number"
              name="vaga"
              value={vaga}
              onChange={handleChange}
              label="Vagas"
            />
            <label>Selecione o local: </label>
            <select name="local" onChange={handleChange} required>
              <option></option>
              {localSelecionado.map(({ id, local }) => (
                <option key={id} value={local}>
                  {local}
                </option>
              ))}
            </select>
            <br />
            <CustomButton type="submit">Cadastrar Nova Atividade</CustomButton>
          </form>
          <br />
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <Icon loading name="spinner" size="huge" color="green" />
        </div>
      )}

      {!loading ? (
        <div className="container">
          {atividadesUsuario.map(
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
              <div
                className="cards"
                key={id}
                onClick={() =>
                  SelecionaAtividade(
                    id,
                    eventoId,
                    titulo,
                    mediador,
                    descricao,
                    data,
                    horario,
                    vaga,
                    local
                  )
                }
              >
                <div className="titulo">Título: {titulo.toUpperCase()}</div>
                <div>Mediador: {mediador.toUpperCase()}</div>
                <div className="descricao" style={{ textAlign: "justify" }}>
                  Descrição: {descricao}
                </div>
                <div>Data: {data}</div>
                <div>Horario: {horario}</div>
                <div>Vagas: {vaga}</div>
                <div>Local: {local}</div>
                <br />
                <div style={{ textAlign: "center" }}>
                  <Icon
                    className="edit-delete-icons"
                    name="edit"
                    size="big"
                    type="submit"
                    onClick={() => AtividadeUpdate(id)}
                  />
                  <Icon
                    className="edit-delete-icons"
                    name="delete"
                    size="big"
                    type="submit"
                    onClick={() => AtividadeDelete(id)}
                  />
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

export default CadastroAtividades;
