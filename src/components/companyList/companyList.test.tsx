import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CompanyList from ".";

const mockOnChange = jest.fn();
const mockOnSubmit = jest.fn();

describe("Companies Container", () => {
  let companies = [
    { name: "company1", url: "url1" },
    { name: "company2", url: "url2" },
    { name: "company3", url: "url3" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render all the companies correctly", () => {
    const { getByText } = render(
      <CompanyList
        companies={companies}
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
      />
    );

    const company1 = getByText(companies[0].name);
    const company2 = getByText(companies[1].name);
    const company3 = getByText(companies[2].name);

    expect(company1).toBeInTheDocument();
    expect(company2).toBeInTheDocument();
    expect(company3).toBeInTheDocument();
  });

  describe("given the submit button is clicked", () => {
    it("should call onSubmit", () => {
      const { getByText } = render(
        <CompanyList
          companies={companies}
          onChange={mockOnChange}
          onSubmit={mockOnSubmit}
        />
      );

      const submitButton = getByText(/submit/i);
      fireEvent.click(submitButton);

      expect(mockOnSubmit).toBeCalledTimes(1);
    });
  });

  describe("given a company is checked", () => {
    it("should call onChange", () => {
      const { getByText } = render(
        <CompanyList
          companies={companies}
          onChange={mockOnChange}
          onSubmit={mockOnSubmit}
        />
      );

      const company1 = getByText(companies[0].name);
      const company2 = getByText(companies[1].name);
      const company3 = getByText(companies[2].name);

      fireEvent.click(company1);
      expect(mockOnChange).toHaveBeenCalledTimes(1);

      fireEvent.click(company2);
      fireEvent.click(company3);
      expect(mockOnChange).toHaveBeenCalledTimes(3);
    });
  });
});
