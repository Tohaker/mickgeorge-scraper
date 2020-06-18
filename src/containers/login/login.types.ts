import { History } from "history";

export type LoginProps = {
  setCompanies: React.Dispatch<React.SetStateAction<never[]>>;
  history: History;
};

export type StateProps = {
  urlList: Array<string>;
};

export type ActionProps = {
  type: "ADD" | "REMOVE" | "RESET" | "UPDATE";
  payload: {
    newValue: string;
    previousValue?: string;
    initialValue?: Array<string>;
  };
};
