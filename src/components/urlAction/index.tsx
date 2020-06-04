import React from "react";
import { Container, UrlInput, Button } from "./urlAction.styles";

type Props = {
  url?: string;
  add: (url: string) => void;
  remove: (url: string) => void;
};

const UrlAction: React.FC<Props> = ({ url = "", add, remove }) => {
  const [value, setValue] = React.useState(url);

  const buttonAction = url === "" ? add : remove;
  const buttonSymbol = url === "" ? "+" : "-";

  return (
    <Container>
      <UrlInput
        value={value}
        readOnly={url !== ""}
        onChange={(e) => setValue(e.target.value)}
        placeholder={url === "" ? "Enter a new URL" : ""}
      />
      <Button
        onClick={() => {
          buttonAction(value);
          setValue("");
        }}
      >
        {buttonSymbol}
      </Button>
    </Container>
  );
};

export default UrlAction;
