import React from "react";
import { Route, Switch } from "react-router-dom";
//import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import "./App.css";
import Header from "./components/header/header.component";
import HomePage from "./pages/homepage.component";
import LoginPage from "./pages/loginpage";

function App() {
  return (
    <div>
      <Header/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/login' component={LoginPage}/>
        </Switch>
    </div>
  );
}

export default App;
