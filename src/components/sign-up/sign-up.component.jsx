import React, { useState } from "react";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { auth, createUserProfileDoc } from "../../firebase/firebase.utils";
import "./sign-up.styles.scss";

const SignUp = () => {
  const [credenciais, setCredenciais] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmaSenha: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nome, email, senha, confirmaSenha } = credenciais;

    if (senha !== confirmaSenha) {
      alert("Senhas não combinam!");
      return;
    }

    try {
      //verifica se o usuário existe
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        senha,
      );

      //cria o usuário com e-mail e senha
      await createUserProfileDoc(user, { nome });

      setCredenciais({
        nome: "",
        email: "",
        senha: "",
        confirmaSenha: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  /*Função handleChange é executada a cada tecla pressionada para atualizar 
  o estado do React que é atualizado conforme o usuário digita.*/
  const handleChange = (e) => {
    const { name, value } = e.target;

    setCredenciais({ [name]: value });
  };

  const {
    nome,
    email,
    senha,
    confirmaSenha,
  } = credenciais;
  return (
    <div className="sign-up">
      <h2 className="title">Não tenho uma conta</h2>
      <span>Entre com seu e-mail e senha</span>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          value={nome}
          onChange={handleChange}
          label="Nome"
          required
        />
        <FormInput
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          label="E-mail"
          required
        />
        <FormInput
          type="password"
          name="password"
          value={senha}
          onChange={handleChange}
          label="Senha"
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmaSenha}
          onChange={handleChange}
          label="Confirmar Senha"
          required
        />
        <CustomButton type="submit">Criar Conta</CustomButton>
      </form>
    </div>
  );
};

export default SignUp;
