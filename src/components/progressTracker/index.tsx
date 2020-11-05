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
  { label: "Name", key: "name" },
  { label: "Extension", key: "extension" },
  { label: "Phone Number", key: "directoryNumber" },
  { label: "Application Username", key: "appUserName" },
  { label: "Device Type", key: "deviceType" },
  { label: "MAC Address", key: "macAddress" },
  { label: "Username", key: "username" },
  { label: "Status", key: "status" },
  { label: "Site name", key: "siteName" },
  { label: "Company Name", key: "companyName" },
  { label: "Voice Recording", key: "voiceRecording"}
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
