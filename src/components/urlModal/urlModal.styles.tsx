import styled from "styled-components";

export const TransparentView = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #cccccc80;
`;

export const Modal = styled.div`
  margin: auto;
  max-width: 70%;
  background-color: white;
  border-radius: 8px;
  border: 0px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
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

export const Subtitle = styled.div`
  font-size: 16px;
  font-style: italic;
  margin-bottom: 8px;
`;

export const UrlList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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

export const ResetButton = styled(Button)`
  background-color: white;
  color: #0099cd;
`;
