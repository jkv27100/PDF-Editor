import { Segment, Header, Icon, Button } from "semantic-ui-react";

interface IProps {
  loading: boolean;
  uploadPdf: () => void;
}
export const Empty = ({ loading, uploadPdf }: IProps) => (
  <Segment placeholder loading={loading} style={{ height: "80vh" }}>
    <Header icon>
      <Icon name="file pdf outline" />
      Upload your PDF to start editing!
    </Header>
    <Button primary onClick={uploadPdf}>
      Load PDF
    </Button>
  </Segment>
);
