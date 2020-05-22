import React from "react";

type Company = {
  name: string;
  link: string;
};

type IProps = {
  companies: Array<Company>;
};

const CompaniesList: React.FC<IProps> = ({ companies }) => {
  return (
    <div>
      {companies.map((company) => (
        <h3>{company.name}</h3>
      ))}
    </div>
  );
};

export default CompaniesList;
