import React from "react";
import { StateProps, ActionProps } from "../login.types";
const { ipcRenderer } = window.require("electron");

export const useLoading = () => {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(true);

  React.useEffect(() => {
    if (!success) {
      setLoading(false);
    }
  }, [success]);

  return { loading, success, setLoading, setSuccess };
};

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
    case "UPDATE":
      const updatedList = state.urlList.map((url) => {
        if (url === action.payload.previousValue) {
          return action.payload.newValue;
        }
        return url;
      });
      ipcRenderer.send("setStoreValue", { key: "urls", value: updatedList });
      return { urlList: updatedList };
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

export const useUrlList = () => {
  const [selectedUrl, setSelectedUrl] = React.useState("");
  const [initialList, setInitialList] = React.useState([""]);
  const [state, dispatch] = React.useReducer(reducer, {
    urlList: initialList,
  });

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
    (async () => {
      const result: string = await ipcRenderer.invoke(
        "getStoreValue",
        "selectedUrl"
      );
      setSelectedUrl(result);
    })();
  }, []);

  React.useEffect(() => {
    if (selectedUrl !== "")
      ipcRenderer.send("setStoreValue", {
        key: "selectedUrl",
        value: selectedUrl,
      });
  }, [selectedUrl]);

  return {
    selectedUrl,
    urlList: state.urlList,
    initialList,
    setSelectedUrl,
    dispatch,
  };
};

export const useCredentials = () => {
  const [username, setUsername] = React.useState("");
  const [domain, setDomain] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [save, setSave] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const initialUsername: string = await ipcRenderer.invoke(
        "getStoreValue",
        "username"
      );
      initialUsername && setUsername(initialUsername);
      const initialDomain: string = await ipcRenderer.invoke(
        "getStoreValue",
        "domain"
      );
      initialDomain && setDomain(initialDomain);
    })();
  }, []);

  React.useEffect(() => {
    if (save) {
      if (username !== "") {
        ipcRenderer.send("setStoreValue", {
          key: "username",
          value: username,
        });
      }

      if (domain !== "") {
        ipcRenderer.send("setStoreValue", {
          key: "domain",
          value: domain,
        });
      }
    }
  }, [save, username, domain]);

  return {
    username,
    domain,
    password,
    save,
    setUsername,
    setDomain,
    setPassword,
    setSave,
  };
};
