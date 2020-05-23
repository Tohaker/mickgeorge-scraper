import querystring from "querystring";
import { SERVER_URL } from "../constants";

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
