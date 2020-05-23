import React from "react";
import { RouteComponentProps } from "react-router-dom";
import LoginComponent from "./component";
import { login } from "#/api";

type Company = {
  name: string;
  link: string;
};

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
    setCompanies(companies);
    history.push("/companies");
  };

  return <LoginComponent submitCredentials={submitCredentials} />;
};

export default LoginContainer;
