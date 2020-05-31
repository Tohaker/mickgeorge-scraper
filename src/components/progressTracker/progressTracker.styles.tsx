import styled from "styled-components";

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
