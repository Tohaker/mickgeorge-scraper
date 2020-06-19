import React from "react";
import LoginComponent from "#/components/login";
import URLModal from "#/components/urlModal";
import { login, setPortalUrl } from "#/api";
import { LoginProps } from "./login.types";
import { useLoading, useUrlList } from "./hooks";

const LoginContainer: React.FC<LoginProps> = ({ setCompanies, history }) => {
  const [username, setUsername] = React.useState("");
  const [domain, setDomain] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);

  const {
    selectedUrl,
    urlList,
    initialList,
    setSelectedUrl,
    dispatch,
  } = useUrlList();
  const { loading, success, setLoading, setSuccess } = useLoading();

  const submitCredentials = async () => {
    if (setPortalUrl(selectedUrl)) {
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

  const sanitizeUrl = (url: string) => {
    if (url.slice(-1) !== "/") {
      const result = /(.*)\//.exec(url);
      if (result) {
        return result[0];
      }
    }
    return url;
  };

  const addUrl = (newValue: string) => {
    if (newValue !== "") {
      dispatch({ type: "ADD", payload: { newValue: sanitizeUrl(newValue) } });
    }
  };

  const removeUrl = (url: string) => {
    dispatch({ type: "REMOVE", payload: { newValue: url } });
  };

  const updateUrl = (newUrl: string, previousUrl: string) => {
    if (newUrl !== "") {
      dispatch({
        type: "UPDATE",
        payload: { newValue: sanitizeUrl(newUrl), previousValue: previousUrl },
      });
    }
  };

  const onSubmit = async () => {
    setLoading(true);
    setSuccess(await submitCredentials());
  };

  const renderModal = (
    <URLModal
      urls={urlList}
      add={addUrl}
      remove={removeUrl}
      update={updateUrl}
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
    urlList,
    selectedUrl,
    renderModal,
    setUsername,
    setDomain,
    setPassword,
    setShowModal,
    onSubmit,
    setUrl: setSelectedUrl,
  };

  return <LoginComponent {...props} />;
};

export default LoginContainer;
