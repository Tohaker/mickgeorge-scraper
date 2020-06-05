import React from "react";
import { action } from "@storybook/addon-actions";
import URLModal from ".";

export default {
  title: "URL Modal",
  component: URLModal,
  excludeStories: /.*Data$/,
};

export const defaultData = {
  urls: ["url1", "url2", "url3", ""],
  add: action("Add"),
  remove: action("Remove"),
  save: action("Save"),
  cancel: action("Cancel"),
};

export const Default = () => <URLModal {...defaultData} />;
