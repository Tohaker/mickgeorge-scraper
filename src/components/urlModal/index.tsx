import React from "react";
import UrlAction from "#/components/urlAction";
import {
  TransparentView,
  Modal,
  UrlList,
  ButtonContainer,
  SaveButton,
  ResetButton,
  Title,
  Subtitle,
  InnerContainer,
} from "./urlModal.styles";

type Props = {
  urls: Array<string>;
  add: (url: string) => void;
  remove: (url: string) => void;
  save: () => void;
  reset: () => void;
};

const URLModal: React.FC<Props> = ({ urls, add, remove, save, reset }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        save();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <TransparentView>
      <Modal ref={ref}>
        <InnerContainer>
          <Title>Edit Portal URLs</Title>
          <Subtitle>
            Preferred format: "https://[type].[custom-name].com/businessportal/"
          </Subtitle>
          <UrlList>
            {urls.map((url, i) => (
              <UrlAction url={url} add={add} remove={remove} key={i} />
            ))}
            <UrlAction url={""} add={add} remove={remove} />
          </UrlList>
          <ButtonContainer>
            <SaveButton onClick={save}>Save</SaveButton>
            <ResetButton onClick={reset}>Reset</ResetButton>
          </ButtonContainer>
        </InnerContainer>
      </Modal>
    </TransparentView>
  );
};

export default URLModal;
