import React from "react";
import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";
import "./signin-signup.styles.scss";

const SignInSignUpPage = () => {
  return (
    <div className="wrapper-sigin-signup">
      <div className="content-sigin-signup">
        <div className="meio-sigin-signup">
          <SignIn />
          <SignUp />
        </div>
      </div>
    </div>
  );
};

export default SignInSignUpPage;
