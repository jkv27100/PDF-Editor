import { AttachmentTypes } from '../entities';
import { Text } from '../containers/Text';
import { Image } from '../containers/Image';
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
  removeAttachment,
  pageDimensions,
  updateAttachment,
}: IProps) => {
  const handleAttachmentUpdate = (index: number) => (attachment: Partial<Attachment>) => {
    console.log(index, attachment);
    updateAttachment(index, attachment);
  };

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
            } else if (attachment.type === AttachmentTypes.IMAGE) {
              return (
                <Image
                  key={key}
                  pageWidth={pageDimensions.width}
                  pageHeight={pageDimensions.height}
                  removeImage={() => removeAttachment(index)}
                  updateImageAttachment={handleAttachmentUpdate(index)}
                  {...(attachment as ImageAttachment)}
                />
              );
            }
            return null;
          })
        : null}
    </>
  ) : null;
};
