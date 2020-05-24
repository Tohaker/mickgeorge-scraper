import React from "react";
import {
  LoginPane,
  Label,
  Input,
  LoginButton,
  Container,
  FailureMessage,
} from "./login.styles";

type Props = {
  username: string;
  domain: string;
  password: string;
  loading: boolean;
  success: boolean;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setDomain: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
};

const LoginComponent: React.FC<Props> = ({
  username,
  domain,
  password,
  loading,
  success,
  setUsername,
  setDomain,
  setPassword,
  onSubmit,
}) => (
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

export default LoginComponent;
