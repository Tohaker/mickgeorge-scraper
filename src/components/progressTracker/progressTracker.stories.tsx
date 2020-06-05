import React from "react";
import styled from "styled-components";
import ProgressTracker from ".";

const Wrapper = styled.div`
  width: 50%;
  height: 300px;
  margin: 12px;
`;

export default {
  title: "Progress Tracker",
  component: ProgressTracker,
  decorators: [(story) => <Wrapper>{story()}</Wrapper>],
  excludeStories: /.*Data$/,
};

export const defaultData = {
  data: [
    {
      username: "username",
      status: "status",
      firstName: "firstname",
      surname: "surname",
      extension: "extension",
      siteName: "siteName",
      link: "link",
    },
  ],
};

export const Default = () => <ProgressTracker current={60} {...defaultData} />;

export const WithMessage = () => (
  <ProgressTracker
    current={20}
    message={"Here is a message\nHere it is on another line!"}
    {...defaultData}
  />
);

export const WithScrollingMessage = () => (
  <ProgressTracker
    current={20}
    message={
      "Line\nLine\nLine\nLine\nLine\nLine\nLine\nLine\nLine\nLine\nLine\nLine\nLine\nLine\nLine\nLine\nLine\nLine\nLine\nLine\nLine\nLine\nLine\nLine\nLine\nLine\n"
    }
    {...defaultData}
  />
);

export const ExportEnabled = () => (
  <ProgressTracker
    current={20}
    message={"Here is a message\nHere it is on another line!"}
    exportDisabled={false}
    {...defaultData}
  />
);
