import React from "react";
import styled from "styled-components";

type IProps = {
  login: (username: string, domain: string, password: string) => void;
};

const Login: React.FC<IProps> = ({ login }) => {
  const userRef = React.useRef<HTMLInputElement>(null);
  const domainRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const onClick = () => {
    if (userRef.current && domainRef.current && passwordRef.current) {
      const username = userRef.current.value;
      const domain = domainRef.current.value;
      const password = passwordRef.current.value;

      login(username, domain, password);
    }
  };

  return (
    <LoginPane>
      <Label>Username</Label>
      <Input ref={userRef} />
      <Label>Domain</Label>
      <Input ref={domainRef} />
      <Label>Password</Label>
      <Input ref={passwordRef} />
      <LoginButton onClick={onClick}>Login</LoginButton>
    </LoginPane>
  );
};

const LoginPane = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: center;
  width: 300px;
  padding: 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 12px;
`;

const Label = styled.label`
  font-weight: bold;
  margin: 4px 0;
`;

const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 28px;
  padding: 6px 12px;
`;

const LoginButton = styled.button`
  background-color: #0099cd;
  color: white;
  border-radius: 6px;
  margin-top: 8px;
  padding: 10px 0;
  font-size: 18px;
`;

export default Login;
