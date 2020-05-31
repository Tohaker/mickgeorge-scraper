import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Props } from "./progressTracker.types";
import { Container, MessageTitle, MessageBox } from "./progressTracker.styles";
import { SubmitButton } from "#/components/companyList/companyList.styles";

import "bootstrap/dist/css/bootstrap.min.css";

const ProgressTracker: React.FC<Props> = ({
  current,
  message,
  exportDisabled = true,
  onExport,
}) => {
  return (
    <Container>
      <ProgressBar now={current} label={`${current.toFixed(1)}%`} />
      <MessageTitle>Details:</MessageTitle>
      <MessageBox value={message} readOnly />
      <SubmitButton onClick={onExport} disabled={exportDisabled}>
        Export to CSV
      </SubmitButton>
    </Container>
  );
};

export default ProgressTracker;
