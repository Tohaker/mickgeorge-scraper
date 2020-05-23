import React from "react";
import {
  LoginPane,
  Label,
  Input,
  LoginButton,
  Container,
  FailureMessage,
} from "./login.styles";

type IProps = {
  submitCredentials: (
    username: string,
    domain: string,
    password: string
  ) => Promise<boolean>;
};

const LoginComponent: React.FC<IProps> = ({ submitCredentials }) => {
  const [username, setUsername] = React.useState("");
  const [domain, setDomain] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(true);

  const onSubmit = async () => {
    setLoading(true);
    setSuccess(await submitCredentials(username, domain, password));
    setLoading(false);
  };

  return (
    <Container>
      {(!loading && (
        <form onSubmit={onSubmit} data-testid="form">
          <LoginPane>
            <Label>Username</Label>
            <Input
              type="text"
              aria-label="username"
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
            />
            <Label>Domain</Label>
            <Input
              type="text"
              aria-label="domain"
              value={domain}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDomain(e.target.value)
              }
            />
            <Label>Password</Label>
            <Input
              type="password"
              aria-label="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
            <LoginButton type="submit">Login</LoginButton>
            {!success && <FailureMessage>Incorrect Login</FailureMessage>}
          </LoginPane>
        </form>
      )) || <div>Loading...</div>}
    </Container>
  );
};

export default LoginComponent;
