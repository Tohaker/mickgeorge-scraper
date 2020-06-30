import React from "react";
import { render, fireEvent } from "@testing-library/react";

describe("Login Component", () => {
  let LoginComponent: React.FC;
  let props: any;

  beforeEach(() => {
    props = {
      username: "username",
      domain: "domain",
      password: "password",
      save: false,
      loading: false,
      success: true,
      urlList: ["url1", "url2", "url3"],
      selectedUrl: "url1",
      showModal: false,
      renderModal: <div>Modal</div>,
      setUsername: jest.fn(),
      setDomain: jest.fn(),
      setPassword: jest.fn(),
      setSave: jest.fn(),
      setShowModal: jest.fn(),
      onSubmit: jest.fn(),
      setUrl: jest.fn(),
    };
    LoginComponent = require(".").default;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the login form with default props", () => {
    const { getByRole, getByLabelText, getByText } = render(
      <LoginComponent {...props} />
    );

    const portalSelect = getByRole("combobox");
    const usernameInput = getByRole("textbox", { name: /username/i });
    const domainInput = getByRole("textbox", { name: /domain/i });
    const passwordInput = getByLabelText(/password/i);
    const saveInput = getByRole("checkbox");
    const loginButton = getByRole("button", { name: /Login/i });

    expect(portalSelect).toBeInTheDocument();
    expect(getByText(/url1/i)).toBeInTheDocument();

    expect(usernameInput).toBeInTheDocument();
    expect(domainInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(saveInput).toBeInTheDocument();
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

  it("should call setUrl when a new url is chosen", () => {
    const { getByRole } = render(<LoginComponent {...props} />);

    const portalSelect = getByRole("combobox");
    fireEvent.change(portalSelect, { target: { value: "url2" } });

    expect(props.setUrl).toHaveBeenCalledWith("url2");
  });

  it("should call setShowModal when settings button is clicked", () => {
    const { getByTestId } = render(<LoginComponent {...props} />);

    const settingsButton = getByTestId("settings");
    fireEvent.click(settingsButton);

    expect(props.setShowModal).toHaveBeenCalledWith(true);
  });

  it("should show the modal when showModal is true", () => {
    props.showModal = true;
    const { getByText } = render(<LoginComponent {...props} />);

    expect(getByText("Modal")).toBeInTheDocument();
  });

  describe("given the password show/hide button", () => {
    let passButton: HTMLElement;
    let passwordBox: HTMLElement;

    beforeEach(() => {
      const { getByText, getByLabelText } = render(
        <LoginComponent {...props} />
      );
      passButton = getByText("Show");
      passwordBox = getByLabelText(/password/i);
    });

    it("should render as Show", () => {
      expect(passButton).toBeInTheDocument();
    });

    it("should render as Hide when clicked", () => {
      fireEvent.click(passButton);
      expect(passButton.innerHTML).toBe("Hide");
    });

    it("should change the password input type when clicked", () => {
      expect(passwordBox).toHaveAttribute("type", "password");
      fireEvent.click(passButton);
      expect(passwordBox).toHaveAttribute("type", "text");
    });
  });

  describe("given the save checkbox", () => {
    let saveBox: HTMLInputElement;

    beforeEach(() => {
      const { getByRole } = render(<LoginComponent {...props} />);
      saveBox = getByRole("checkbox") as HTMLInputElement;
    });

    it("should render unchecked", () => {
      expect(saveBox.checked).toBeFalsy();
    });

    it("should call setSave when checked", () => {
      fireEvent.click(saveBox);
      expect(props.setSave).toBeCalledTimes(1);
    });
  });
});
