import React from "react";
import { History } from "history";
import LoginComponent from "#/components/login";
import { login } from "#/api";
import { LOCALSTORAGE_URLLIST } from "#/constants";

type LoginProps = {
  setCompanies: React.Dispatch<React.SetStateAction<never[]>>;
  history: History;
};

type StateProps = {
  urlList: Array<string>;
};

type ActionProps = {
  type: "ADD" | "REMOVE";
  payload: string;
};

const reducer = (state: StateProps, action: ActionProps) => {
  switch (action.type) {
    case "ADD":
      state.urlList.push(action.payload);
      localStorage.setItem(LOCALSTORAGE_URLLIST, JSON.stringify(state.urlList));
      return { urlList: state.urlList };
    case "REMOVE":
      const newList = state.urlList.filter((url) => url !== action.payload);
      localStorage.setItem(LOCALSTORAGE_URLLIST, JSON.stringify(newList));
      return { urlList: newList };
    default:
      return { urlList: state.urlList };
  }
};

const LoginContainer: React.FC<LoginProps> = ({ setCompanies, history }) => {
  const initialList: Array<string> = JSON.parse(
    localStorage.getItem(LOCALSTORAGE_URLLIST) || '[""]'
  );

  const [username, setUsername] = React.useState("");
  const [domain, setDomain] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [state, dispatch] = React.useReducer(reducer, { urlList: initialList });
  const [url, setUrl] = React.useState(initialList[0]);

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(true);

  const submitCredentials = async () => {
    const companies = await login(username, domain, password);
    if (companies.length > 0) {
      setCompanies(companies);
      history.push("/companies");
      return true;
    } else {
      return false;
    }
  };

  const addUrl = () => {
    const newUrl = prompt("Enter your new URL");
    if (newUrl) {
      dispatch({ type: "ADD", payload: newUrl });
    }
  };

  const removeUrl = (url: string) => {
    dispatch({ type: "REMOVE", payload: url });
  };

  React.useEffect(() => {
    if (!success) {
      setLoading(false);
    }
  }, [success]);

  const onSubmit = async () => {
    setLoading(true);
    setSuccess(await submitCredentials());
  };

  const props = {
    username,
    domain,
    password,
    loading,
    success,
    urlList: state.urlList,
    selectedUrl: url,
    setUsername,
    setDomain,
    setPassword,
    onSubmit,
    setUrl,
    addUrl,
  };

  return <LoginComponent {...props} />;
};

export default LoginContainer;
