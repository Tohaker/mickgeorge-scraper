import styled from "styled-components";

export const TransparentView = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #cccccc80;
`;

export const Modal = styled.div`
  margin: auto;
  background-color: white;
  border-radius: 8px;
  border: 0px;
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px 12px;
  padding: 8px;
`;

export const Title = styled.div`
  font-size: 20px;
  margin-bottom: 4px;
`;

export const UrlList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 40%;
  margin-bottom: 4px;
`;

const Button = styled.button`
  width: 100%;
  border-radius: 4px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const SaveButton = styled(Button)`
  background-color: #0099cd;
  color: white;
  border: 0px;
  margin-right: 6px;
`;

export const CancelButton = styled(Button)`
  background-color: white;
  color: #0099cd;
`;
