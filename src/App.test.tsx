import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";

describe("App", () => {
  let App: React.FC<any>;

  const mockLoginContainer = jest.fn(() => <div>Login Container</div>);
  const mockCompanies = jest.fn(() => <div>Companies</div>);

  beforeEach(() => {
    jest.mock("#/containers/login", () => mockLoginContainer);
    jest.mock("#/containers/companyList", () => mockCompanies);
    App = require("./App").default;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the login container by default", () => {
    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <App />
      </Router>
    );

    expect(container.innerHTML).toMatch(/Login Container/);
  });

  it("renders the company page at /companies", () => {
    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <App />
      </Router>
    );

    history.push("/companies");
    expect(container.innerHTML).toMatch(/Companies/);
    expect(mockCompanies).toBeCalledWith({ companies: [] }, {});
  });
});
