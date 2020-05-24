import React from "react";
import {
  render,
  fireEvent,
  waitForElement,
  waitForElementToBeRemoved,
} from "@testing-library/react";

describe("Login Container", () => {
  let LoginContainer: React.FC;
  let props: any;

  const mockLogin = jest.fn();
  const mockSetCompanies = jest.fn();
  const mockHistory = {
    push: jest.fn(),
  };

  beforeEach(() => {
    jest.mock("../api", () => ({
      login: mockLogin,
    }));

    props = {
      setCompanies: mockSetCompanies,
      history: mockHistory,
    };

    LoginContainer = require(".").default;
  });

  describe("given the login button is pressed", () => {
    describe("given the login succeeds", () => {
      beforeEach(() => {
        mockLogin.mockImplementation(() =>
          Promise.resolve([{ name: "company", link: "url" }])
        );
      });

      it("should call login and show the loading indicator", async () => {
        const { getByRole, getByLabelText, getByText, getByTestId } = render(
          <LoginContainer {...props} />
        );

        const usernameInput = getByRole("textbox", { name: /username/i });
        const domainInput = getByRole("textbox", { name: /domain/i });
        const passwordInput = getByLabelText(/password/i);

        fireEvent.change(usernameInput, { target: { value: "username" } });
        fireEvent.change(domainInput, { target: { value: "domain" } });
        fireEvent.change(passwordInput, { target: { value: "password" } });
        fireEvent.submit(getByTestId("form"));

        await waitForElement(() => getByText(/Loading.../i));

        expect(mockLogin).toBeCalledWith("username", "domain", "password");
        expect(usernameInput).not.toBeInTheDocument();
        expect(domainInput).not.toBeInTheDocument();
        expect(passwordInput).not.toBeInTheDocument();
        expect(getByText(/Loading.../i)).toBeInTheDocument();
      });
    });
  });

  describe("given the submission fails", () => {
    beforeEach(() => {
      mockLogin.mockImplementation(() => Promise.resolve([]));
    });

    it("should call submitCredentials and show the failure message", async () => {
      const { getByRole, getByLabelText, getByText, getByTestId } = render(
        <LoginContainer {...props} />
      );

      const usernameInput = getByRole("textbox", { name: /username/i });
      const domainInput = getByRole("textbox", { name: /domain/i });
      const passwordInput = getByLabelText(/password/i);

      fireEvent.change(usernameInput, { target: { value: "username" } });
      fireEvent.change(domainInput, { target: { value: "domain" } });
      fireEvent.change(passwordInput, { target: { value: "password" } });
      fireEvent.submit(getByTestId("form"));

      await waitForElementToBeRemoved(() => getByText(/Loading.../i));

      expect(mockLogin).toBeCalledWith("username", "domain", "password");
      expect(getByText(/Incorrect Login/i)).toBeInTheDocument();
    });
  });
});
