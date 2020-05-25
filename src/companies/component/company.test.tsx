import React from "react";
import { render } from "@testing-library/react";

describe("Company Component", () => {
  let Company: React.FC<any>;

  beforeEach(() => {
    Company = require(".").default;
  });

  it("should render correctly", () => {
    const props = {
      name: "company name",
      id: "id",
      value: "value",
    };
    const { getByRole, getByText } = render(<Company {...props} />);

    const checkbox = getByRole("checkbox");
    const name = getByText(props.name);

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute("id", props.id);
    expect(checkbox).toHaveAttribute("name", props.id);
    expect(checkbox).toHaveAttribute("value", props.value);
    expect(name).toBeInTheDocument();
  });
});
