import React from "react";
import LoginComponent from "#/components/login";
import URLModal from "#/components/urlModal";
import { login, setPortalUrl } from "#/api";
import { LoginProps, StateProps, ActionProps } from "./login.types";

const { ipcRenderer } = window.require("electron");

const reducer = (state: StateProps, action: ActionProps) => {
  switch (action.type) {
    case "ADD":
      state.urlList.push(action.payload.newValue);
      ipcRenderer.send("setStoreValue", {
        key: "urls",
        value: state.urlList,
      });
      return { urlList: state.urlList };
    case "REMOVE":
      const newList = state.urlList.filter(
        (url) => url !== action.payload.newValue
      );
      ipcRenderer.send("setStoreValue", { key: "urls", value: newList });
      return { urlList: newList };
    case "RESET":
      action.payload.initialValue &&
        ipcRenderer.send("setStoreValue", {
          key: "urls",
          value: action.payload.initialValue,
        });
      return { urlList: action.payload.initialValue || [] };
    default:
      return { urlList: state.urlList };
  }
};

const LoginContainer: React.FC<LoginProps> = ({ setCompanies, history }) => {
  const [username, setUsername] = React.useState("");
  const [domain, setDomain] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);

  const [initialList, setInitialList] = React.useState([""]);
  const [state, dispatch] = React.useReducer(reducer, {
    urlList: initialList,
  });
  const [url, setUrl] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      const result: Array<string> = await ipcRenderer.invoke(
        "getStoreValue",
        "urls"
      );
      setInitialList(result);
      dispatch({
        type: "RESET",
        payload: { newValue: "", initialValue: result },
      });
    })();
  }, []);

  React.useEffect(() => {
    if (!success) {
      setLoading(false);
    }
  }, [success]);

  React.useEffect(() => {
    if (url !== "")
      ipcRenderer.send("setStoreValue", { key: "selectedUrl", value: url });
  }, [url]);

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

  const addUrl = (newValue: string) => {
    if (newValue !== "") {
      dispatch({ type: "ADD", payload: { newValue } });
    }
  };

  const removeUrl = (url: string) => {
    dispatch({ type: "REMOVE", payload: { newValue: url } });
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
        dispatch({
          type: "RESET",
          payload: { newValue: "", initialValue: initialList },
        });
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
