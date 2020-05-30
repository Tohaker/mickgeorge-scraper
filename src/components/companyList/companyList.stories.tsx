import React from "react";
import styled from "styled-components";
import { action } from "@storybook/addon-actions";
import CompaniesList from ".";

const Wrapper = styled.div`
  width: 50%;
  height: 500px;
  padding: 8px;
  font-family: Arial, Helvetica, sans-serif;
`;

export default {
  title: "Companies List",
  component: CompaniesList,
  decorators: [(story) => <Wrapper>{story()}</Wrapper>],
  excludeStories: /.*Data$/,
};

export const defaultData = {
  companies: [
    {
      name: "company 1",
      url: "http://company.one",
    },
    {
      name: "longer company 2",
      url: "http://company.two",
    },
  ],
  onChange: action("onChange"),
  onSubmit: action("onSubmit"),
};

const manyCompanies = () => {
  const companies = [];

  for (var i = 0; i < 30; i++) {
    companies.push({
      name: `company ${i}`,
      url: `http://company${i}.com`,
    });
  }

  return companies;
};

export const Default = () => <CompaniesList {...defaultData} />;

export const ManyCompanies = () => (
  <CompaniesList {...defaultData} companies={manyCompanies()} />
);
