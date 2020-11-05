import querystring from "querystring";
import { SERVER_URL } from "../constants";

export const setPortalUrl = (newUrl: string) => {
  const queryString = querystring.stringify({ url: newUrl });
  const url = `${SERVER_URL}/portal?${queryString}`;

  const response = fetch(url)
    .then(() => true)
    .catch((err) => {
      console.error(err);
      return false;
    });

  return response;
};

export const login = (username: string, domain: string, password: string) => {
  const queryString = querystring.stringify({ username, domain, password });
  const url = `${SERVER_URL}/login?${queryString}`;

  const response = fetch(url)
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
      return [];
    });

  return response;
};

export type Employee = {
  username: string;
  status: string;
  firstName: string;
  surname: string;
  extension: string;
  siteName: string;
  link: string;
  voiceRecording: Array<string | null>;
};

export const scrapeCompany = (companyUrl: string): Promise<Array<Employee>> => {
  const queryString = querystring.stringify({ url: companyUrl });
  const url = `${SERVER_URL}/company?${queryString}`;

  const response = fetch(url)
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
      return [];
    });

  return response;
};

export type ExtraEmployeeData = {
  appUserName: string;
  deviceType: string;
  macAddress: string;
  directoryNumber: string;
};

export const getEmployee = (
  employeeUrl: string
): Promise<ExtraEmployeeData> => {
  const queryString = querystring.stringify({ url: employeeUrl });
  const url = `${SERVER_URL}/employee?${queryString}`;

  const response = fetch(url)
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
      return {};
    });

  return response;
};
