import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";

describe("Company List Container", () => {
  let CompanyListContainer: React.FC<any>;

  const mockScrapeCompany = jest.fn();
  const mockGetEmployee = jest.fn();

  const companies = [
    { name: "company1", url: "url1" },
    { name: "company2", url: "url2" },
    { name: "company3", url: "url3" },
  ];

  const mockEmployee = {
    username: "username",
    status: "status",
    firstName: "firstname",
    surname: "surname",
    extension: "extension",
    siteName: "siteName",
    link: "link",
  };

  beforeEach(() => {
    jest.resetAllMocks();

    jest.mock("#/api", () => ({
      scrapeCompany: mockScrapeCompany,
      getEmployee: mockGetEmployee,
    }));

    CompanyListContainer = require(".").default;
  });

  it("should call correct APIs when submit is clicked", async () => {
    mockScrapeCompany.mockImplementation(() => Promise.resolve([mockEmployee]));
    mockGetEmployee.mockImplementation(() => Promise.resolve());

    const { getByRole, getByText } = render(
      <CompanyListContainer companies={companies} />
    );

    const checkbox1 = getByRole("checkbox", { name: "company1" });
    const checkbox3 = getByRole("checkbox", { name: "company3" });
    const submitButton = getByRole("button", { name: "Submit" });

    fireEvent.click(checkbox1);
    fireEvent.click(checkbox3);
    fireEvent.click(submitButton);

    await waitForElement(() => getByText(/company3/i));

    expect(mockScrapeCompany).toHaveBeenCalledWith("url1");
    expect(mockScrapeCompany).toHaveBeenCalledWith("url3");
    expect(mockGetEmployee).toHaveBeenCalledWith(mockEmployee.link);
    expect(mockGetEmployee).toHaveBeenCalledTimes(2);
  });

  it("should increment the ProgressBar percentage", async () => {
    mockScrapeCompany.mockImplementation(() =>
      Promise.resolve([mockEmployee, mockEmployee, mockEmployee, mockEmployee])
    );
    mockGetEmployee.mockImplementation(() => Promise.resolve());

    const { getByRole, getByText } = render(
      <CompanyListContainer companies={companies} />
    );

    const checkbox1 = getByRole("checkbox", { name: "company1" });
    const submitButton = getByRole("button", { name: "Submit" });
    const progressBar = getByRole("progressbar");

    expect(progressBar).toHaveAttribute("aria-valuenow", "0");

    fireEvent.click(checkbox1);
    fireEvent.click(submitButton);

    await waitForElement(() => getByText(/100.0%/i));

    expect(progressBar).toHaveAttribute("aria-valuenow", "100");
  });
});
