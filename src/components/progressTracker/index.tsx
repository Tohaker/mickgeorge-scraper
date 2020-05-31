import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Props } from "./progressTracker.types";
import { Container, MessageTitle, MessageBox } from "./progressTracker.styles";

import "bootstrap/dist/css/bootstrap.min.css";

const ProgressTracker: React.FC<Props> = ({ current, message }) => {
  return (
    <Container>
      <ProgressBar now={current} label={`${current.toFixed(1)}%`} />
      <MessageTitle>Details:</MessageTitle>
      <MessageBox value={message} readOnly />
    </Container>
  );
};

export default ProgressTracker;
