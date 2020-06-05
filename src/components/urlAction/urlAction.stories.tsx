import React from "react";
import { action } from "@storybook/addon-actions";
import UrlAction from ".";

export default {
  title: "URL Action",
  component: UrlAction,
  excludeStories: /.*Data$/,
};

export const defaultData = {
  add: action("Add"),
  remove: action("Remove"),
};

export const Default = () => (
  <>
    <UrlAction {...defaultData} url={"https://someurl.com"} />
    <UrlAction {...defaultData} />
  </>
);
