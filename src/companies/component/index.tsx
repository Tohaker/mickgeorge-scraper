import React from "react";
import { Container, CompanyName, Checkbox } from "./company.styles";

type Props = {
  name: string;
  id: string;
  value: string;
};

const Company: React.FC<Props> = ({ name, id, value }) => {
  return (
    <Container>
      <CompanyName>
        {name}
        <Checkbox type="checkbox" id={id} name={id} value={value} />
      </CompanyName>
    </Container>
  );
};

export default Company;
