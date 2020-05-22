import React from "react";
import {
  LoginPane,
  Label,
  Input,
  LoginButton,
  LoadingSpinner,
} from "./login.styles";

type IProps = {
  submitCredentials: (
    username: string,
    domain: string,
    password: string
  ) => void;
};

const LoginComponent: React.FC<IProps> = ({ submitCredentials }) => {
  const [username, setUsername] = React.useState("");
  const [domain, setDomain] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    return () => {
      setLoading(false);
    };
  });

  const onSubmit = () => {
    setLoading(true);
    submitCredentials(username, domain, password);
  };

  return (
    <>
      {(!loading && (
        <form onSubmit={onSubmit}>
          <LoginPane>
            <Label>Username</Label>
            <Input
              type="text"
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
            />
            <Label>Domain</Label>
            <Input
              type="text"
              value={domain}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDomain(e.target.value)
              }
            />
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
            <LoginButton type="submit">Login</LoginButton>
          </LoginPane>
        </form>
      )) || <LoadingSpinner>Loading...</LoadingSpinner>}
    </>
  );
};

export default LoginComponent;
