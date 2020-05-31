import { Employee, ExtraEmployeeData } from "#/api";

export type Company = {
  name: string;
  url: string;
};

export type Data = Array<Employee & ExtraEmployeeData>;

export type Props = {
  companies: Array<Company>;
};
