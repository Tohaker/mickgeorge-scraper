import React from "react";
import { action } from "@storybook/addon-actions";
import Company from ".";

export default {
  title: "Company",
  component: Company,
  excludeStories: /.*Data$/,
};

export const defaultData = {
  name: "Company Name",
  index: 1,
  value: "https://some.url",
  onChange: action("onChange"),
};

export const Default = () => <Company {...defaultData} />;
