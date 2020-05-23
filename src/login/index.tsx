import React from "react";
import { RouteComponentProps } from "react-router-dom";
import LoginComponent from "./component";
import { login } from "../api";

interface LoginProps extends RouteComponentProps {
  setCompanies: React.Dispatch<React.SetStateAction<never[]>>;
}

const LoginContainer: React.FC<LoginProps> = ({ setCompanies, history }) => {
  const submitCredentials = async (
    username: string,
    domain: string,
    password: string
  ) => {
    const companies = await login(username, domain, password);
    if (companies.length > 0) {
      setCompanies(companies);
      history.push("/companies");
      return true;
    } else {
      return false;
    }
  };

  return <LoginComponent submitCredentials={submitCredentials} />;
};

export default LoginContainer;
