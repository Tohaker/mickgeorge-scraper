import React from "react";
import { RouteComponentProps } from "react-router-dom";
import LoginComponent from "./component";
import { login } from "../api";

interface LoginProps extends RouteComponentProps {
  setCompanies: React.Dispatch<React.SetStateAction<never[]>>;
}

const LoginContainer: React.FC<LoginProps> = ({ setCompanies, history }) => {
  const [username, setUsername] = React.useState("");
  const [domain, setDomain] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(true);

  const submitCredentials = async () => {
    const companies = await login(username, domain, password);
    if (companies.length > 0) {
      setCompanies(companies);
      history.push("/companies");
      return true;
    } else {
      return false;
    }
  };

  React.useEffect(() => {
    if (!success) {
      setLoading(false);
    }
  }, [success]);

  const onSubmit = async () => {
    setLoading(true);
    setSuccess(await submitCredentials());
  };

  const props = {
    username,
    domain,
    password,
    loading,
    success,
    setUsername,
    setDomain,
    setPassword,
    onSubmit,
  };

  return <LoginComponent {...props} />;
};

export default LoginContainer;
