import React from "react";
import { Container, UrlInput, Button, Spacer } from "./urlAction.styles";
import editIcon from "#/assets/edit-white.png";
import tickIcon from "#/assets/tick-white.png";

type Props = {
  url: string;
  add: (url: string) => void;
  remove: (url: string) => void;
  update: (url: string, previous: string) => void;
};

const UrlAction: React.FC<Props> = ({ url, add, remove, update }) => {
  const [value, setValue] = React.useState(url);
  const [editMode, setEditMode] = React.useState(false);

  React.useEffect(() => {
    setValue(url);
  }, [url]);

  const buttonAction = url === "" ? add : remove;
  const buttonSymbol = url === "" ? "+" : "-";

  return (
    <Container>
      <UrlInput
        type="text"
        value={value}
        readOnly={url !== "" && !editMode}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        placeholder={url === "" ? "Enter a new URL" : ""}
      />
      <Button
        onClick={() => {
          buttonAction(value);
          if (url === "") setValue("");
        }}
      >
        {buttonSymbol}
      </Button>
      {buttonSymbol === "-" ? (
        <Button
          onClick={() => {
            setEditMode(!editMode);
            if (editMode && value !== url) {
              update(value, url);
            }
          }}
        >
          <img src={editMode ? tickIcon : editIcon} alt="Edit" />
        </Button>
      ) : (
        <Spacer />
      )}
    </Container>
  );
};

export default UrlAction;
