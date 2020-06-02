import styled from "styled-components";
import { CSVLink } from "react-csv";
import { ExportButtonProps } from "./progressTracker.types";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 8px;
`;

export const MessageTitle = styled.div`
  font-weight: bold;
  margin-top: 8px;
`;

export const MessageBox = styled.textarea`
  border: 0px;
  box-sizing: border-box;
  height: 100%;
  resize: none;
`;

export const ExportButton = styled(CSVLink)`
  width: 100%;
  min-height: 32px;

  border: 0px;
  border-radius: 8px;

  text-align: center;

  font-size: 18px;

  :hover {
    color: ${(p: ExportButtonProps) => (p.disabled ? "#666" : "white")};
    cursor: ${(p: ExportButtonProps) => (p.disabled ? "default" : "pointer")};
    text-decoration: none;
  }

  ${(p: ExportButtonProps) =>
    p.disabled
      ? "background-color: #cccccc; color: #666666;"
      : "background-color: #057196; color: white;"}
`;
