import React from "react";
import styled from "styled-components";
import Login from "./login";

const App = () => {
  const login = async (username: string, domain: string, password: string) => {
    fetch(
      `http://localhost:3001/login?username=${encodeURIComponent(
        username
      )}&domain=${encodeURIComponent(domain)}&password=${encodeURIComponent(
        password
      )}`
    )
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  return (
    <AppContainer>
      <Login login={login} />
    </AppContainer>
  );
};

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default App;
