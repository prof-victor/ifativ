import React, { useState } from "react";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";

const SignIn = () => {
  const [credenciais, setCredenciais] = useState({
    email: "",
    senha: "",
  });

  const { email, senha } = credenciais;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, senha);
      setCredenciais({ email: "", senha: "" });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setCredenciais({ ...credenciais, [name]: value });
  };

  return (
    <div className="signin">
      <div>Já possuo uma conta</div>
      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          handleChange={handleChange}
          value={email}
          label="E-mail"
          autoComplete="on"
          autoFocus
          required
        />
        <FormInput
          name="senha"
          type="password"
          value={senha}
          handleChange={handleChange}
          label="Senha"
          autoComplete="on"
          required
        />
        <CustomButton type="submit"> Entrar </CustomButton>
        <CustomButton type="button" onClick={signInWithGoogle} isGoogleSignIn>
          Entrar com Google
        </CustomButton>
      </form>
    </div>
  );
};

export default SignIn;
