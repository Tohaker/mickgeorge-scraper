import React from "react";
import UrlAction from "#/components/urlAction";
import {
  TransparentView,
  Modal,
  UrlList,
  ButtonContainer,
  SaveButton,
  CancelButton,
  Title,
  InnerContainer,
} from "./urlModal.styles";

type Props = {
  urls: Array<string>;
  add: (url: string) => void;
  remove: (url: string) => void;
  save: () => void;
  cancel: () => void;
};

const URLModal: React.FC<Props> = ({ urls, add, remove, save, cancel }) => {
  return (
    <TransparentView>
      <Modal>
        <InnerContainer>
          <Title>Edit your Portal URLs</Title>
          <UrlList>
            {urls.map((url, i) => (
              <UrlAction url={url} add={add} remove={remove} key={i} />
            ))}
          </UrlList>
          <ButtonContainer>
            <SaveButton onClick={save}>Save</SaveButton>
            <CancelButton onClick={cancel}>Cancel</CancelButton>
          </ButtonContainer>
        </InnerContainer>
      </Modal>
    </TransparentView>
  );
};

export default URLModal;
