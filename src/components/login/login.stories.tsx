import React from "react";
import { action } from "@storybook/addon-actions";
import Login from ".";

export default {
  title: "Login",
  component: Login,
  excludeStories: /.*Data$/,
};

const Container = (props) => {
  const [username, setUsername] = React.useState("");
  const [domain, setDomain] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <Login
      username={username}
      setUsername={setUsername}
      domain={domain}
      setDomain={setDomain}
      password={password}
      setPassword={setPassword}
      {...props}
    />
  );
};

export const defaultData = {
  loading: false,
  success: true,
  onSubmit: (e) => {
    e.preventDefault();
  },
  urlList: [
    "https://hosted.mickgeorge.co.uk/businessportal/",
    "url1",
    "url2",
    "url3",
  ],
  openSettings: action("openSettings"),
};

export const Default = () => <Container {...defaultData} />;

export const Loading = () => <Container {...defaultData} loading={true} />;

export const Failed = () => <Container {...defaultData} success={false} />;
