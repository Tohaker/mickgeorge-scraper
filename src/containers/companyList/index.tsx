import React from "react";
import { Props } from "./companyList.types";
import { scrapeCompany, getEmployee, Employee, ExtraEmployeeData } from "#/api";

const CompanyListContainer: React.FC<Props> = ({ companies }) => {
  const initialState = companies.map((state) => ({
    ...state,
    checked: false,
  }));

  const [checked, setChecked] = React.useState(initialState);
  const [progress, setProgress] = React.useState(0);

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    checked[index].checked = event.target.checked;
    setChecked(checked);
  };

  const onSubmit = async () => {
    const areChecked = checked.filter((company) => company.checked);
    const totalCount = areChecked.length;
    const fullData: Array<Employee & ExtraEmployeeData> = [];

    areChecked.forEach(async ({ name, url }, companyIndex) => {
      const employees = await scrapeCompany(url);
      const employeeCount = employees.length;
      employees.forEach(async ({ link }, employeeIndex) => {
        const extraData = await getEmployee(link);
        fullData.push({ ...employees[employeeIndex], ...extraData });

        const primaryProgress = (companyIndex + 1) / totalCount;
        const secondaryProgress = (employeeIndex + 1) / employeeCount;
        setProgress((secondaryProgress / primaryProgress) * 100);
      });
    });

    console.log(fullData);
  };

  return <></>;
};

export default CompanyListContainer;
