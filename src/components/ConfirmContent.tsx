import React from "react";
import { Header, Button } from "semantic-ui-react";

interface IProps {
  onConfirm: () => void;
  onDismiss: () => void;
  title: string;
}

export const ConfirmContent = ({ title, onConfirm, onDismiss }: IProps) => (
  <div>
    <Header as="h4" inverted>
      {title}
    </Header>

    <Button onClick={onDismiss}>No</Button>
    <Button negative onClick={onConfirm}>
      Yes
    </Button>
  </div>
);
