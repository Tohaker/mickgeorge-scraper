import styled from "Login/component/node_modules/styled-components";

export const LoginPane = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: center;
  width: 300px;
  padding: 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 12px;
`;

export const Label = styled.label`
  font-weight: bold;
  margin: 4px 0;
`;

export const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 28px;
  padding: 6px 12px;
`;

export const LoginButton = styled.button`
  background-color: #0099cd;
  color: white;
  border-radius: 6px;
  margin-top: 8px;
  padding: 10px 0;
  font-size: 18px;
`;

export const LoadingSpinner = styled.div``;
