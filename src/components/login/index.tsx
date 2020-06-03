import React from "react";
import {
  LoginPane,
  Label,
  Input,
  LoginButton,
  Container,
  FailureMessage,
  PortalContainer,
  PortalSelect,
  SettingsButton,
} from "./login.styles";

import { ReactComponent as CogIcon } from "#/assets/cog.svg";

type Props = {
  username?: string;
  domain?: string;
  password?: string;
  loading: boolean;
  success: boolean;
  urlList: Array<string>;
  selectedUrl: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setDomain: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (event: React.ChangeEvent<HTMLFormElement>) => void;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  addUrl: () => void;
};

const LoginComponent: React.FC<Props> = ({
  username,
  domain,
  password,
  loading,
  success,
  urlList,
  selectedUrl,
  setUsername,
  setDomain,
  setPassword,
  onSubmit,
  setUrl,
  addUrl,
}) => (
  <Container>
    {(!loading && (
      <form onSubmit={onSubmit} data-testid="form">
        <LoginPane>
          <Label>Portal URL</Label>
          <PortalContainer>
            <PortalSelect
              onChange={(e) => setUrl(e.target.selectedOptions[0].text)}
            >
              {urlList.map((url) => (
                <option selected={url === selectedUrl}>{url}</option>
              ))}
            </PortalSelect>
            <SettingsButton
              onClick={(e) => {
                e.preventDefault();
                addUrl();
              }}
            >
              <CogIcon />
            </SettingsButton>
          </PortalContainer>
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
