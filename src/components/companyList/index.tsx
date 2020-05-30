import React from "react";
import { Props } from "./companyList.types";
import { Container, CompanyList, SubmitButton } from "./companyList.styles";
import Company from "#/components/company";

const CompaniesList: React.FC<Props> = ({ companies, onChange, onSubmit }) => (
  <Container>
    <CompanyList>
      {companies.map(({ name, url }, index) => {
        return (
          <Company
            name={name}
            index={index}
            value={url}
            onChange={onChange}
            key={index}
          />
        );
      })}
    </CompanyList>
    <SubmitButton onClick={onSubmit}>Submit</SubmitButton>
  </Container>
);

export default CompaniesList;
