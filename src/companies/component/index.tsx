import React from "react";
import { Container, CompanyName, Checkbox } from "./company.styles";

type Props = {
  name: string;
  index: number;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void;
};

const formatID = (name: string) => {
  return name.replace(" ", "-");
};

const Company: React.FC<Props> = ({ name, index, value, onChange }) => {
  const id = formatID(name);
  return (
    <Container>
      <CompanyName htmlFor={id}>{name}</CompanyName>
      <Checkbox
        type="checkbox"
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e, index)}
      />
    </Container>
  );
};

export default Company;
