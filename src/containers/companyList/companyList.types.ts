import { ExtraEmployeeData } from "#/api";

export type Company = {
  name: string;
  url: string;
};

type FormattedEmployee = {
  username: string;
  status: string;
  name: string;
  extension: string;
  siteName: string;
  link: string;
};

export type Data = Array<
  FormattedEmployee & ExtraEmployeeData & { companyName: string }
>;

export type Props = {
  companies: Array<Company>;
};
