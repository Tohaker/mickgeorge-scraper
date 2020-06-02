import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Props } from "./progressTracker.types";
import {
  Container,
  MessageTitle,
  MessageBox,
  ExportButton,
} from "./progressTracker.styles";

import "bootstrap/dist/css/bootstrap.min.css";

const headers = [
  { label: "Username", key: "username" },
  { label: "Status", key: "status" },
  { label: "First Name", key: "firstName" },
  { label: "Last Name", key: "surname" },
  { label: "Application Username", key: "appUserName" },
  { label: "Device Type", key: "deviceType" },
  { label: "MAC Address", key: "macAddress" },
  { label: "Phone Number", key: "directoryNumber" },
  { label: "Extension", key: "extension" },
  { label: "Site name", key: "siteName" },
];

const ProgressTracker: React.FC<Props> = ({
  current,
  message,
  exportDisabled = true,
  data,
}) => {
  return (
    <Container>
      <ProgressBar now={current} label={`${current.toFixed(1)}%`} />
      <MessageTitle>Details:</MessageTitle>
      <MessageBox value={message} readOnly />
      <ExportButton
        data={data}
        headers={headers}
        disabled={exportDisabled}
        onClick={() => !exportDisabled}
        filename="export_data.csv"
      >
        Export to CSV
      </ExportButton>
    </Container>
  );
};

export default ProgressTracker;
