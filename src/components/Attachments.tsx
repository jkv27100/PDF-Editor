import { AttachmentTypes } from '../entities';
import { Text } from '../containers/Text';
import { IDimensions, ITextAttachment } from '../interface';

interface IProps {
  attachments: Attachment[];
  pdfName: string;
  pageDimensions: IDimensions;
  removeAttachment: (index: number) => void;
  updateAttachment: (index: number, attachment: Partial<Attachment>) => void;
}

export const Attachments = ({
  attachments,
  pdfName,
  pageDimensions,
  updateAttachment,
  removeAttachment,
}: IProps) => {
  const handleAttachmentUpdate = (index: number) => (attachment: Partial<Attachment>) =>
    updateAttachment(index, attachment);
  return attachments ? (
    <>
      {attachments.length
        ? attachments.map((attachment, index) => {
            const key = `${attachment.id}`;
            if (attachment.type === AttachmentTypes.TEXT) {
              return (
                <Text
                  key={key}
                  attachmentIndex={index}
                  pageWidth={pageDimensions.width}
                  pageHeight={pageDimensions.height}
                  updateTextAttachment={handleAttachmentUpdate(index)}
                  {...(attachment as ITextAttachment)}
                />
              );
            }
            return null;
          })
        : null}
    </>
  ) : null;
};
