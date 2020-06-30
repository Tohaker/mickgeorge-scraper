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
  InlineContainer,
  Checkbox,
  CredentialsCheck,
} from "./login.styles";

import { ReactComponent as CogIcon } from "#/assets/cog.svg";

type Props = {
  username?: string;
  domain?: string;
  password?: string;
  save?: boolean;
  loading: boolean;
  success: boolean;
  urlList: Array<string>;
  selectedUrl: string;
  showModal: boolean;
  renderModal: JSX.Element;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setDomain: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setSave: React.Dispatch<React.SetStateAction<boolean>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (event: React.ChangeEvent<HTMLFormElement>) => void;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
};

const LoginComponent: React.FC<Props> = ({
  username,
  domain,
  password,
  save,
  loading,
  success,
  urlList,
  selectedUrl,
  showModal,
  renderModal,
  setUsername,
  setDomain,
  setPassword,
  setSave,
  setShowModal,
  onSubmit,
  setUrl,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <>
      <Container>
        {(!loading && (
          <form onSubmit={onSubmit} data-testid="form">
            <LoginPane>
              <Label>Portal URL</Label>
              <PortalContainer>
                <PortalSelect
                  onChange={(e) => setUrl(e.target.selectedOptions[0].text)}
                  value={selectedUrl}
                >
                  {urlList.map((url, i) => (
                    <option value={url} key={i}>
                      {url}
                    </option>
                  ))}
                </PortalSelect>
                <SettingsButton
                  data-testid="settings"
                  type="button"
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
              <InlineContainer>
                <Input
                  type={showPassword ? "text" : "password"}
                  aria-label="password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                />
                <button onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "Hide" : "Show"}
                </button>
              </InlineContainer>
              <CredentialsCheck>
                <Checkbox
                  type="checkbox"
                  aria-label="save"
                  checked={save}
                  onChange={() => setSave(!save)}
                />
                <Label style={{ marginLeft: "4px" }}>Save credentials</Label>
              </CredentialsCheck>
              <LoginButton type="submit">Login</LoginButton>
              {!success && <FailureMessage>Incorrect Login</FailureMessage>}
            </LoginPane>
          </form>
        )) || <div>Loading...</div>}
      </Container>
      {showModal && renderModal}
    </>
  );
};

export default LoginComponent;
