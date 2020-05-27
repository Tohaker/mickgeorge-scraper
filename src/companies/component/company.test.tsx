import React from "react";
import { render, fireEvent } from "@testing-library/react";

const mockOnChange = jest.fn();

describe("Company Component", () => {
  let Company: React.FC<any>;

  beforeEach(() => {
    Company = require(".").default;
  });

  it("should render correctly", () => {
    const props = {
      name: "company name",
      index: 1,
      value: "value",
      onChange: mockOnChange,
    };
    const { getByRole, getByText } = render(<Company {...props} />);

    const checkbox = getByRole("checkbox");
    const name = getByText(props.name);

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute("id", "company-name");
    expect(checkbox).toHaveAttribute("name", "company-name");
    expect(checkbox).toHaveAttribute("value", props.value);
    expect(name).toBeInTheDocument();
  });

  it("should call the onChange handler", () => {
    const props = {
      name: "company name",
      index: 1,
      value: "value",
      onChange: mockOnChange,
    };
    const { getByRole } = render(<Company {...props} />);

    const checkbox = getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(mockOnChange).toHaveBeenCalledWith(expect.any(Object), 1);
  });
});
