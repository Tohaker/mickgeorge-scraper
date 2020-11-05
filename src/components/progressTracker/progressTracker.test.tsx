import React from "react";
import { render } from "@testing-library/react";
import ProgressTracker from ".";

describe("Progress Tracker", () => {
  const data = [
    {
      username: "username",
      name: "firstname surname",
      status: "status",
      extension: "ext",
      siteName: "site",
      link: "link",
      appUserName: "appUserName",
      deviceType: "deviceType",
      macAddress: "macAddress",
      directoryNumber: "directoryNumber",
      companyName: "company",
      voiceRecording: ["Voice Recording"]
    },
  ];

  beforeEach(() => jest.resetAllMocks());

  it("should match snapshot", () => {
    const { container } = render(<ProgressTracker current={0} data={data} />);
    expect(container).toMatchSnapshot();
  });

  it("should render with a progress bar and no messages", () => {
    const { getByRole } = render(<ProgressTracker current={20} data={data} />);

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
        data={data}
      />
    );

    const progressBar = getByRole("progressbar");
    const messageBox = getByRole("textbox");

    expect(progressBar).toBeInTheDocument();
    expect(messageBox).toHaveValue("here\nis\nsome\nmessage");
  });
});
