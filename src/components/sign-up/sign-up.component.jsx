import React, { useState } from "react";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { auth, createUserProfileDoc } from "../../firebase/firebase.utils";

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
      const { user } = await auth.createUserWithEmailAndPassword(email, senha);
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCredenciais({ [name]: value });
  };

  const { nome, email, senha, confirmaSenha } = credenciais;
  return (
    <div className="signup">
      <div>Criar uma conta</div>
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
          autoComplete="on"
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmaSenha}
          onChange={handleChange}
          label="Confirmar Senha"
          autoComplete="on"
          required
        />
        <CustomButton type="submit">Criar Conta</CustomButton>
      </form>
    </div>
  );
};

export default SignUp;
