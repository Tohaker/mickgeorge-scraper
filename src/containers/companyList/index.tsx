import React from "react";
import { CSVDownload } from "react-csv";
import { Props, Data } from "./companyList.types";
import { Container } from "./companyList.styles";
import { scrapeCompany, getEmployee } from "#/api";
import CompanyList from "#/components/companyList";
import ProgressTracker from "#/components/progressTracker";

const CompanyListContainer: React.FC<Props> = ({ companies }) => {
  const initialState = companies.map((state) => ({
    ...state,
    checked: false,
  }));

  const [companyStates, setCompanyStates] = React.useState(initialState);
  const [scrapedData, setScrapedData] = React.useState<Data>([]);
  const [progress, setProgress] = React.useState(0);
  const [message, setMessage] = React.useState("");
  const [exportRequested, setExport] = React.useState(false);

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    companyStates[index].checked = event.target.checked;
    setCompanyStates(companyStates);
  };

  const exportToCSV = () => {
    const headers = [
      { label: "Username", key: "username" },
      { label: "Status", key: "status" },
      { label: "First Name", key: "firstName" },
      { label: "Last Name", key: "surname" },
      { label: "Application Username", key: "appUserName" },
      { label: "Device Type", key: "deviceType" },
      { label: "MAC Address", key: "macAddress" },
      { label: "Phone Number", key: "phone" },
      { label: "Extension", key: "extension" },
      { label: "Site name", key: "siteName" },
    ];

    return (
      <CSVDownload
        data={scrapedData}
        headers={headers}
        target="_blank"
      />
    );
  };

  const onSubmit = async () => {
    const areChecked = companyStates.filter((company) => company.checked);

    const companyTotal = areChecked.length;
    let currentMessage = message;
    let companyCount = 0;

    const fullData: Data = [];

    for (const company of areChecked) {
      const { name, url } = company;
      currentMessage = `${currentMessage}> Scraping ${name}\n`;
      setMessage(currentMessage);

      const employees = await scrapeCompany(url);
      const employeeTotal = employees.length;

      let employeeCount = 1;

      for (const employee of employees) {
        const extraData = await getEmployee(employee.link);
        fullData.push({ ...employee, ...extraData });

        const primaryProgress = companyCount / companyTotal;
        const secondaryProgress =
          (employeeCount / employeeTotal) * (1 / companyTotal);
        setProgress((primaryProgress + secondaryProgress) * 100);

        employeeCount++;
      }

      currentMessage = `${currentMessage}> Found ${employeeTotal} Employee(s)\n`;
      setMessage(currentMessage);

      companyCount++;
    }

    setScrapedData(fullData);
    console.log(fullData);
  };

  return (
    <Container>
      <CompanyList
        companies={companies}
        onChange={onChange}
        onSubmit={onSubmit}
      />
      <ProgressTracker
        current={progress}
        message={message}
        exportDisabled={scrapedData.length === 0}
        onExport={() => setExport(true)}
      />
      {exportRequested && exportToCSV()}
    </Container>
  );
};

export default CompanyListContainer;
