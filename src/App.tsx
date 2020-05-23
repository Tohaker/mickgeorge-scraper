import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginContainer from "./Login";
import Companies from "./companies";

const App = () => {
  const [companies, setCompanies] = React.useState([]);

  return (
    <Router>
      <AppContainer>
        <Route
          path="/"
          render={(props) => (
            <LoginContainer setCompanies={setCompanies} {...props} />
          )}
          exact
        />
        <Route
          path="/companies"
          render={() => <Companies companies={companies} />}
        />
      </AppContainer>
    </Router>
  );
};

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default App;
