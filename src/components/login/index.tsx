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
  showModal: boolean;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setDomain: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (event: React.ChangeEvent<HTMLFormElement>) => void;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  renderModal: () => JSX.Element;
};

const LoginComponent: React.FC<Props> = ({
  username,
  domain,
  password,
  loading,
  success,
  urlList,
  selectedUrl,
  showModal,
  setUsername,
  setDomain,
  setPassword,
  setShowModal,
  onSubmit,
  setUrl,
  renderModal,
}) => (
  <>
    <Container>
      {(!loading && (
        <form onSubmit={onSubmit} data-testid="form">
          <LoginPane>
            <Label>Portal URL</Label>
            <PortalContainer>
              <PortalSelect
                onChange={(e) => setUrl(e.target.selectedOptions[0].text)}
                defaultValue={selectedUrl}
              >
                {urlList.map((url, i) => (
                  <option key={i}>{url}</option>
                ))}
              </PortalSelect>
              <SettingsButton
                data-testid="settings"
                onClick={(e) => {
                  e.preventDefault();
                  setShowModal(true);
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
    {showModal && renderModal()}
  </>
);

export default LoginComponent;
