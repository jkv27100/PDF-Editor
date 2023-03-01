import { Menu, Dropdown } from 'semantic-ui-react';
import { AttachmentTypes } from '../entities';
import { useAttachments } from '../hooks/useAttachments';
import { ITextAttachment } from '../interface';
import { ggID } from '../utils/helpers';

interface IProps {
  uploadNewPdf: () => void;
  isPdfLoaded: boolean;
  addImage: () => void;
  savingPdfStatus: boolean;
  savePdf: () => void;
}

const MenuBar = ({ uploadNewPdf, isPdfLoaded, savingPdfStatus, savePdf, addImage }: IProps) => {
  const { addAttachment } = useAttachments();

  const handleAddText = () => {
    const newTextAttachment: ITextAttachment = {
      id: ggID(),
      type: AttachmentTypes.TEXT,
      x: 0,
      y: 0,
      size: 14,
      lineHeight: 1.4,
      text: 'This is a added label',
      width: 120,
      height: 16,
    };
    addAttachment(newTextAttachment);
  };

  return (
    <Menu pointing>
      <Menu.Item header>PDF Editor</Menu.Item>
      <Menu.Menu position='right'>
        {isPdfLoaded && (
          <>
            <Dropdown item closeOnBlur icon='edit outline' simple>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleAddText}>Add Text</Dropdown.Item>
                <Dropdown.Item onClick={addImage}>Add Image</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Menu.Item
              name={savingPdfStatus ? 'Saving...' : 'Save'}
              disabled={savingPdfStatus}
              onClick={savePdf}
            />
            <Menu.Item name='Upload New' onClick={uploadNewPdf} />
          </>
        )}
      </Menu.Menu>
    </Menu>
  );
};

export default MenuBar;
