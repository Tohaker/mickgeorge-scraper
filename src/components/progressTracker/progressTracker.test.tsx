import React from "react";
import { render } from "@testing-library/react";
import ProgressTracker from ".";

describe("Progress Tracker", () => {
  it("should render with a progress bar and no messages", () => {
    const { getByRole } = render(<ProgressTracker current={20} />);

    const progressBar = getByRole("progressbar");
    const messageBox = getByRole("textbox");

    expect(progressBar).toBeInTheDocument();
    expect(messageBox).toHaveValue("");
  });

  it("should render with a progress bar and some messages", () => {
    const { getByRole } = render(
      <ProgressTracker current={20} message={"here\nis\nsome\nmessage"} />
    );

    const progressBar = getByRole("progressbar");
    const messageBox = getByRole("textbox");

    expect(progressBar).toBeInTheDocument();
    expect(messageBox).toHaveValue("here\nis\nsome\nmessage");
  });
});
