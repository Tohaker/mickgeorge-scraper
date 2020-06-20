import React from "react";
import { render, fireEvent } from "@testing-library/react";
import editIcon from "#/assets/edit-white.png";
import tickIcon from "#/assets/tick-white.png";
import UrlAction from ".";

describe("URL Action", () => {
  const props = {
    add: jest.fn(),
    remove: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("given the add button is clicked", () => {
    let addButton: HTMLElement;
    let textBox: HTMLElement;

    beforeEach(() => {
      const { getByText, getByRole } = render(<UrlAction {...props} url="" />);
      addButton = getByText("+");
      textBox = getByRole("textbox");
    });

    it("should call add", () => {
      expect(addButton).toBeInTheDocument();

      fireEvent.change(textBox, { target: { value: "text" } });
      fireEvent.click(addButton);

      expect(props.add).toHaveBeenCalledWith("text");
    });
  });

  describe("given the remove button is clicked", () => {
    let removeButton: HTMLElement;

    beforeEach(() => {
      const { getByText } = render(<UrlAction {...props} url="url" />);
      removeButton = getByText("-");
    });

    it("should call remove", () => {
      expect(removeButton).toBeInTheDocument();

      fireEvent.click(removeButton);

      expect(props.remove).toHaveBeenCalledWith("url");
    });
  });

  describe("given the edit button is clicked", () => {
    let editButton: HTMLElement;
    let textBox: HTMLElement;

    beforeEach(() => {
      const { getByAltText, getByRole } = render(
        <UrlAction {...props} url="url" />
      );
      editButton = getByAltText("Edit");
      textBox = getByRole("textbox");
    });

    it("should change the icon", () => {
      expect(editButton).toHaveAttribute("src", editIcon);

      fireEvent.click(editButton);

      expect(editButton).toHaveAttribute("src", tickIcon);
    });

    it("should allow the text to be edited", () => {
      expect(textBox).toHaveAttribute("readOnly");

      fireEvent.click(editButton);

      expect(textBox).not.toHaveAttribute("readOnly");
    });

    describe("given a new value is entered", () => {
      it("should call update", () => {
        fireEvent.click(editButton);
        expect(props.update).not.toBeCalled();

        const value = "text";
        fireEvent.change(textBox, { target: { value } });

        fireEvent.click(editButton);
        expect(props.update).toBeCalledWith(value, "url");
        expect(props.update).toBeCalledTimes(1);
      });

      it("should not call update", () => {
        fireEvent.click(editButton);
        expect(props.update).not.toBeCalled();

        const value = "url";
        fireEvent.change(textBox, { target: { value } });

        fireEvent.click(editButton);
        expect(props.update).not.toBeCalled();
      });
    });
  });
});
