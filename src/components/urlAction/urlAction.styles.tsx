import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  margin-bottom: 4px;
`;

export const UrlInput = styled.input`
  border-radius: 4px;
  width: 100%;
`;

export const Button = styled.button`
  margin: 4px;
  width: 26px;
  padding-bottom: 2px;
  border-radius: 50%;
  border: 0px;
  background-color: #0099cd;
  color: white;
  text-align: center;

  img {
    margin-left: -3px;
    margin-top: -3px;
    width: 20px;
    height: 20px;
  }
`;

export const Spacer = styled.div`
  margin: 5px;
  width: 26px;
`;
