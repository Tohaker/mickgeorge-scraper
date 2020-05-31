import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginContainer from "#/containers/login";
import Companies from "#/containers/companyList";

const App = () => {
  const [companies, setCompanies] = React.useState([]);

  return (
    <Switch>
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
    </Switch>
  );
};

export default App;
