type Company = {
  name: string;
  url: string;
};

export type Props = {
  companies: Array<Company>;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  onSubmit: () => void;
};
