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

export const Default = () => <ProgressTracker current={60} />;

export const WithMessage = () => (
  <ProgressTracker
    current={20}
    message={"Here is a message\nHere it is on another line!"}
  />
);

export const WithScrollingMessage = () => (
  <ProgressTracker
    current={20}
    message={
      "Line\nLine\nLine\nLine\nLine\nLine\nLine\nLine\nLine\nLine\nLine\nLine\nLine\nLine\nLine\nLine\nLine\nLine\nLine\nLine\nLine\nLine\nLine\nLine\nLine\nLine\n"
    }
  />
);
