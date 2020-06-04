import React from "react";
import { render, fireEvent } from "@testing-library/react";
import URLModal from ".";

describe("URL Modal", () => {
  const props = {
    add: jest.fn(),
    remove: jest.fn(),
    save: jest.fn(),
    reset: jest.fn(),
  };

  beforeEach(() => jest.resetAllMocks());

  it("should render with all supplied urls and blank one", () => {
    const { getByText, getByDisplayValue } = render(
      <URLModal {...props} urls={["url1", "url2"]} />
    );

    const url1 = getByDisplayValue("url1");
    const url2 = getByDisplayValue("url2");
    const addButton = getByText("+");

    expect(url1).toBeInTheDocument();
    expect(url2).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  it("should call save when Save button is clicked", () => {
    const { getByText } = render(
      <URLModal {...props} urls={["url1", "url2"]} />
    );

    fireEvent.click(getByText("Save"));

    expect(props.save).toHaveBeenCalled();
  });

  it("should call reset when Reset button is clicked", () => {
    const { getByText } = render(
      <URLModal {...props} urls={["url1", "url2"]} />
    );

    fireEvent.click(getByText("Reset"));

    expect(props.reset).toHaveBeenCalled();
  });
});
