import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ProgressTracker from ".";

const mockOnExport = jest.fn();

describe("Progress Tracker", () => {
  beforeEach(() => jest.resetAllMocks());

  it("should render with a progress bar and no messages", () => {
    const { getByRole } = render(
      <ProgressTracker current={20} onExport={mockOnExport} />
    );

    const progressBar = getByRole("progressbar");
    const messageBox = getByRole("textbox");

    expect(progressBar).toBeInTheDocument();
    expect(messageBox).toHaveValue("");
  });

  it("should render with a progress bar and some messages", () => {
    const { getByRole } = render(
      <ProgressTracker
        current={20}
        message={"here\nis\nsome\nmessage"}
        onExport={mockOnExport}
      />
    );

    const progressBar = getByRole("progressbar");
    const messageBox = getByRole("textbox");

    expect(progressBar).toBeInTheDocument();
    expect(messageBox).toHaveValue("here\nis\nsome\nmessage");
  });

  it("should call onExport when the export button is clicked", () => {
    const { getByRole } = render(
      <ProgressTracker
        current={20}
        message={"here\nis\nsome\nmessage"}
        exportDisabled={false}
        onExport={mockOnExport}
      />
    );

    const exportButton = getByRole("button");
    fireEvent.click(exportButton);

    expect(mockOnExport).toHaveBeenCalledTimes(1);
  });
});
