import React from "react";
import { render, fireEvent } from "@testing-library/react";
import UrlAction from ".";

describe("URL Action", () => {
  const props = {
    add: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should render with add button", () => {
    const { getByText } = render(<UrlAction {...props} url="" />);

    expect(getByText("+")).toBeInTheDocument();
  });

  it("should call add with add button", () => {
    const { getByText, getByRole } = render(<UrlAction {...props} url="" />);

    const input = getByRole("textbox");
    fireEvent.change(input, { target: { value: "text" } });
    fireEvent.click(getByText("+"));

    expect(props.add).toHaveBeenCalledWith("text");
  });

  it("should render with remove button", () => {
    const { getByText } = render(<UrlAction {...props} url="url" />);

    expect(getByText("-")).toBeInTheDocument();
  });

  it("should call remove with remove button", () => {
    const { getByText } = render(<UrlAction {...props} url="url" />);

    fireEvent.click(getByText("-"));

    expect(props.remove).toHaveBeenCalledWith("url");
  });
});
