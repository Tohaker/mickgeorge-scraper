import React from "react";
import { createMemoryHistory } from "history";
import {
  render,
  fireEvent,
  waitForElement,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { LOCALSTORAGE_URLLIST } from "#/constants";

describe("Login Container", () => {
  let LoginContainer: React.FC;
  let props: any;

  const mockLogin = jest.fn();
  const mockSetPortalUrl = jest.fn();
  const mockSetCompanies = jest.fn();

  const setItemSpy = jest.spyOn(window.localStorage.__proto__, "setItem");
  const getItemSpy = jest.spyOn(window.localStorage.__proto__, "getItem");

  beforeEach(() => {
    jest.mock("#/api", () => ({
      login: mockLogin,
      setPortalUrl: mockSetPortalUrl,
    }));

    getItemSpy.mockImplementation(() => JSON.stringify(["url1", "url2"]));

    props = {
      setCompanies: mockSetCompanies,
      history: createMemoryHistory(),
    };

    LoginContainer = require(".").default;
  });

  afterEach(() => jest.resetAllMocks());

  describe("given the login button is pressed", () => {
    describe("given the portal url is set correctly", () => {
      beforeEach(() => {
        mockSetPortalUrl.mockImplementation(() => true);
      });

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

    describe("given the portal url fails to set", () => {
      beforeEach(() => {
        mockSetPortalUrl.mockImplementation(() => false);
      });

      it("should show the failure message", async () => {
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

        expect(getByText(/Incorrect Login/i)).toBeInTheDocument();
      });
    });
  });

  describe("given the settings button is pressed", () => {
    it("should display the urlModal", () => {
      const { getByTestId, getByText, getAllByDisplayValue } = render(
        <LoginContainer {...props} />
      );

      const settingsButton = getByTestId("settings");
      fireEvent.click(settingsButton);

      const url1 = getAllByDisplayValue("url1")[1];
      const url2 = getAllByDisplayValue("url2")[0];

      expect(getByText("Edit your Portal URLs"));
      expect(url1).toBeInTheDocument();
      expect(url2).toBeInTheDocument();
    });

    it("should update the localStorage when a url is added", () => {
      const { getByTestId, getByText, getAllByDisplayValue } = render(
        <LoginContainer {...props} />
      );

      const settingsButton = getByTestId("settings");
      fireEvent.click(settingsButton);

      const emptyInput = getAllByDisplayValue("")[3];
      const addButton = getByText("+");

      fireEvent.change(emptyInput, { target: { value: "test url" } });
      fireEvent.click(addButton);

      expect(setItemSpy).toHaveBeenCalledWith(
        LOCALSTORAGE_URLLIST,
        expect.stringContaining("test url")
      );
    });

    it("should update the localStorage when a url is removed", () => {
      const { getByTestId, getAllByText } = render(
        <LoginContainer {...props} />
      );

      const settingsButton = getByTestId("settings");
      fireEvent.click(settingsButton);

      const removeButton = getAllByText("-")[0];

      fireEvent.click(removeButton);

      expect(setItemSpy).toHaveBeenCalledWith(
        LOCALSTORAGE_URLLIST,
        expect.not.stringContaining("url1")
      );
    });

    it("should reset to the starting value when reset is pressed", () => {
      const { getByTestId, getByText } = render(<LoginContainer {...props} />);

      const settingsButton = getByTestId("settings");
      fireEvent.click(settingsButton);

      const resetButton = getByText("Reset");
      fireEvent.click(resetButton);

      const initialValue = JSON.parse(
        localStorage.getItem(LOCALSTORAGE_URLLIST) || '[""]'
      );

      initialValue.forEach((element: string) => {
        expect(getByText(element)).toBeInTheDocument();
      });
    });

    it("should close the modal when save is clicked", () => {
      const { getByTestId, getByText } = render(<LoginContainer {...props} />);

      const settingsButton = getByTestId("settings");
      fireEvent.click(settingsButton);

      const saveButton = getByText("Save");
      fireEvent.click(saveButton);

      expect(saveButton).not.toBeInTheDocument();
    });
  });
});
