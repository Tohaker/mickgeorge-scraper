import React from "react";
import { createMemoryHistory } from "history";
import {
  render,
  fireEvent,
  waitForElement,
  waitForElementToBeRemoved,
} from "@testing-library/react";

describe("Login Container", () => {
  let LoginContainer: React.FC;
  let props: any;

  let response: Array<string>;

  const mockLogin = jest.fn();
  const mockSetPortalUrl = jest.fn();
  const mockSetCompanies = jest.fn();
  const mockSend = jest.fn();
  const mockInvoke = jest.fn();

  beforeEach(() => {
    window.require = require;
    response = ["url1", "url2"];

    jest.mock("#/api", () => ({
      login: mockLogin,
      setPortalUrl: mockSetPortalUrl,
    }));

    jest.mock("electron", () => ({
      ipcRenderer: {
        send: mockSend,
        invoke: mockInvoke,
      },
    }));

    mockInvoke.mockImplementation((key, value) => {
      if (value === "urls") return Promise.resolve(response);
      if (value === "selectedUrl") return Promise.resolve(response[0]);
    });

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
    it("should display the urlModal", async () => {
      const { getByTestId, getByText, getAllByDisplayValue } = render(
        <LoginContainer {...props} />
      );

      await waitForElement(() => getByText(/username/i));

      const settingsButton = getByTestId("settings");
      fireEvent.click(settingsButton);

      await waitForElement(() => getByText(/Edit/i));

      const url1 = getAllByDisplayValue("url1")[1];
      const url2 = getAllByDisplayValue("url2")[0];

      expect(getByText("Edit your Portal URLs"));
      expect(url1).toBeInTheDocument();
      expect(url2).toBeInTheDocument();
    });

    it("should update the store when a url is added", async () => {
      const { getByTestId, getByText, getAllByDisplayValue } = render(
        <LoginContainer {...props} />
      );

      await waitForElement(() => getByText(/username/i));

      const settingsButton = getByTestId("settings");
      fireEvent.click(settingsButton);

      await waitForElement(() => getByText(/Edit/i));

      const emptyInput = getAllByDisplayValue("")[3];
      const addButton = getByText("+");

      fireEvent.change(emptyInput, { target: { value: "http://test-url/" } });
      fireEvent.click(addButton);

      expect(mockSend).toHaveBeenCalledWith("setStoreValue", {
        key: "urls",
        value: ["url1", "url2", "http://test-url/"],
      });
    });

    it("should sanitize the url", async () => {
      const { getByTestId, getByText, getAllByDisplayValue } = render(
        <LoginContainer {...props} />
      );

      await waitForElement(() => getByText(/username/i));

      const settingsButton = getByTestId("settings");
      fireEvent.click(settingsButton);

      await waitForElement(() => getByText(/Edit/i));

      const emptyInput = getAllByDisplayValue("")[3];
      const addButton = getByText("+");

      fireEvent.change(emptyInput, {
        target: { value: "http://test-url.com/login.jsp" },
      });
      fireEvent.click(addButton);

      expect(mockSend).toHaveBeenCalledWith("setStoreValue", {
        key: "urls",
        value: ["url1", "url2", "http://test-url.com/"],
      });
    });

    it("should update the store when a url is removed", async () => {
      const { getByTestId, getAllByText, getByText } = render(
        <LoginContainer {...props} />
      );

      await waitForElement(() => getByText(/username/i));

      const settingsButton = getByTestId("settings");
      fireEvent.click(settingsButton);

      await waitForElement(() => getByText(/Edit/i));

      const removeButton = getAllByText("-")[0];

      fireEvent.click(removeButton);

      expect(mockSend).toHaveBeenCalledWith("setStoreValue", {
        key: "urls",
        value: ["url2"],
      });
    });

    it("should reset to the starting value when reset is pressed", async () => {
      const { getByTestId, getByText } = render(<LoginContainer {...props} />);

      await waitForElement(() => getByText(/username/i));

      const settingsButton = getByTestId("settings");
      fireEvent.click(settingsButton);

      await waitForElement(() => getByText(/Edit/i));

      const resetButton = getByText("Reset");
      fireEvent.click(resetButton);

      expect(mockSend).toHaveBeenCalledWith("setStoreValue", {
        key: "urls",
        value: ["url1", "url2"],
      });
    });

    it("should close the modal when save is clicked", async () => {
      const { getByTestId, getByText } = render(<LoginContainer {...props} />);

      await waitForElement(() => getByText(/username/i));

      const settingsButton = getByTestId("settings");
      fireEvent.click(settingsButton);

      await waitForElement(() => getByText(/Edit/i));

      const saveButton = getByText("Save");
      fireEvent.click(saveButton);

      expect(saveButton).not.toBeInTheDocument();
    });
  });
});
