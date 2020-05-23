import React from "react";
import { render, fireEvent } from "@testing-library/react";

describe("Login Component", () => {
  let LoginComponent;

  const mockSubmit = jest.fn();

  beforeEach(() => {
    LoginComponent = require(".").default;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the login form", () => {
    const { getByRole, getByLabelText } = render(
      <LoginComponent submitCredentials={mockSubmit} />
    );

    const usernameInput = getByRole("textbox", { name: /username/i });
    const domainInput = getByRole("textbox", { name: /domain/i });
    const passwordInput = getByLabelText(/password/i);
    const loginButton = getByRole("button", { name: /Login/i });

    expect(usernameInput).toBeInTheDocument();
    expect(domainInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  describe("given the login button is pressed", () => {
    it("should call submitCredentials and show the loading indicator", () => {
      const { getByRole, getByLabelText, getByText, getByTestId } = render(
        <LoginComponent submitCredentials={mockSubmit} />
      );

      const usernameInput = getByRole("textbox", { name: /username/i });
      const domainInput = getByRole("textbox", { name: /domain/i });
      const passwordInput = getByLabelText(/password/i);

      fireEvent.change(usernameInput, { target: { value: "username" } });
      fireEvent.change(domainInput, { target: { value: "domain" } });
      fireEvent.change(passwordInput, { target: { value: "password" } });
      fireEvent.submit(getByTestId("form"));

      expect(mockSubmit).toBeCalledWith("username", "domain", "password");
      expect(usernameInput).not.toBeInTheDocument();
      expect(domainInput).not.toBeInTheDocument();
      expect(passwordInput).not.toBeInTheDocument();
      expect(getByText(/Loading.../i)).toBeInTheDocument();
    });
  });
});
