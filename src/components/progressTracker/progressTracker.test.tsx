import React from "react";
import { render } from "@testing-library/react";
import ProgressTracker from ".";

describe("Progress Tracker", () => {
  const data = [
    {
      username: "username",
      status: "status",
      firstName: "firstName",
      surname: "surname",
      extension: "ext",
      siteName: "site",
      link: "link",
      appUserName: "appUserName",
      deviceType: "deviceType",
      macAddress: "macAddress",
      directoryNumber: "directoryNumber",
    },
  ];

  beforeEach(() => jest.resetAllMocks());

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
