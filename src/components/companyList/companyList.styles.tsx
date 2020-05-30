import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const CompanyList = styled.div`
  margin-bottom: 8px;

  display: flex;
  flex-direction: column;

  overflow: auto;
`;

export const SubmitButton = styled.button`
  width: 100%;
  min-height: 32px;

  border: 0px;
  border-radius: 8px;

  background-color: #0099cd;
  color: white;
  font-size: 18px;

  :hover {
    border: 0px;
    background-color: #057196;
  }
`;
