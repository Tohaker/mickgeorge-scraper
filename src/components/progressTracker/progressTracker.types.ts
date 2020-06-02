import { Data } from "#/containers/companyList/companyList.types";

export type Props = {
  current: number;
  message?: string;
  exportDisabled?: boolean;
  data: Data;
};

export type ExportButtonProps = {
  disabled: boolean;
};
