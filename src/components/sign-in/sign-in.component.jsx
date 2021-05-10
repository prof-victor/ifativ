import React, { useState } from "react";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";
import "./sign-in.styles.scss";

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

  const handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  return (
    <div className="signin">
      <h2>Já tenho uma conta</h2>
      <span>Entrar com e-mail e senha </span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          handleChange={handleChange}
          value={email}
          label="E-mail"
          required
        />
        <FormInput
          name="password"
          type="password"
          value={senha}
          handleChange={handleChange}
          label="Senha"
          required
        />
        <div className="buttons">
          <CustomButton type="submit"> Entrar </CustomButton>
          <CustomButton type="button" onClick={signInWithGoogle} isGoogleSignIn>
            Entrar com Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
