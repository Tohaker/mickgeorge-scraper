import React from "react";
import { History } from "history";
import LoginComponent from "#/components/login";
import URLModal from "#/components/urlModal";
import { login, setPortalUrl } from "#/api";
import { LOCALSTORAGE_URLLIST } from "#/constants";

type LoginProps = {
  setCompanies: React.Dispatch<React.SetStateAction<never[]>>;
  history: History;
};

type StateProps = {
  urlList: Array<string>;
};

type ActionProps = {
  type: "ADD" | "REMOVE" | "RESET";
  payload: string;
};

const initialList: Array<string> = JSON.parse(
  localStorage.getItem(LOCALSTORAGE_URLLIST) || '[""]'
);

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
    case "RESET":
      return { urlList: initialList };
    default:
      return { urlList: state.urlList };
  }
};

const LoginContainer: React.FC<LoginProps> = ({ setCompanies, history }) => {
  const [username, setUsername] = React.useState("");
  const [domain, setDomain] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);
  const [state, dispatch] = React.useReducer(reducer, {
    urlList: initialList,
  });
  const [url, setUrl] = React.useState(initialList[0]);

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(true);

  React.useEffect(() => {
    if (!success) {
      setLoading(false);
    }
  }, [success]);

  const submitCredentials = async () => {
    if (setPortalUrl(url)) {
      const companies = await login(username, domain, password);
      if (companies.length > 0) {
        setCompanies(companies);
        history.push("/companies");
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const addUrl = (newUrl: string) => {
    if (newUrl !== "") {
      dispatch({ type: "ADD", payload: newUrl });
    }
  };

  const removeUrl = (url: string) => {
    dispatch({ type: "REMOVE", payload: url });
  };

  const onSubmit = async () => {
    setLoading(true);
    setSuccess(await submitCredentials());
  };

  const renderModal = () => (
    <URLModal
      urls={state.urlList}
      add={addUrl}
      remove={removeUrl}
      save={() => setShowModal(false)}
      reset={() => {
        dispatch({ type: "RESET", payload: "" });
        setShowModal(false);
      }}
    />
  );

  const props = {
    username,
    domain,
    password,
    showModal,
    loading,
    success,
    urlList: state.urlList,
    selectedUrl: url,
    setUsername,
    setDomain,
    setPassword,
    setShowModal,
    onSubmit,
    setUrl,
    renderModal,
  };

  return <LoginComponent {...props} />;
};

export default LoginContainer;
