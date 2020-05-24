import React from "react";
import { render } from "@testing-library/react";

describe("Login Component", () => {
  let LoginComponent: React.FC;
  let props: any;

  beforeEach(() => {
    props = {
      username: "username",
      domain: "domain",
      password: "password",
      loading: false,
      success: true,
      setUsername: jest.fn(),
      setDomain: jest.fn(),
      setPassword: jest.fn(),
      onSubmit: jest.fn(),
    };
    LoginComponent = require(".").default;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the login form with default props", () => {
    const { getByRole, getByLabelText } = render(<LoginComponent {...props} />);

    const usernameInput = getByRole("textbox", { name: /username/i });
    const domainInput = getByRole("textbox", { name: /domain/i });
    const passwordInput = getByLabelText(/password/i);
    const loginButton = getByRole("button", { name: /Login/i });

    expect(usernameInput).toBeInTheDocument();
    expect(domainInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it("should render the login form in loading state", () => {
    props.loading = true;
    const { getByText } = render(<LoginComponent {...props} />);

    expect(getByText(/Loading.../i)).toBeInTheDocument();
  });

  it("should render failure message when success is false", () => {
    props.success = false;
    const { getByText } = render(<LoginComponent {...props} />);

    expect(getByText(/Incorrect Login/i)).toBeInTheDocument();
  });
});
