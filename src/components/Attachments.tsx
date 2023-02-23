import React from "react";
import { AttachmentTypes } from "../entities";
import { Text } from "../containers/Text";

interface Props {
  attachments: Attachment[];
  pdfName: string;
  pageDimensions: Dimensions;
  removeAttachment: (index: number) => void;
  updateAttachment: (index: number, attachment: Partial<Attachment>) => void;
}

export const Attachments: React.FC<Props> = ({
  attachments,
  pdfName,
  pageDimensions,
  removeAttachment,
  updateAttachment,
}) => {
  const handleAttachmentUpdate =
    (index: number) => (attachment: Partial<Attachment>) =>
      updateAttachment(index, attachment);

  return attachments ? (
    <>
      {attachments.length
        ? attachments.map((attachment, index) => {
            const key = `${pdfName}-${index}`;
            if (attachment.type === AttachmentTypes.TEXT) {
              return (
                <Text
                  key={key}
                  pageWidth={pageDimensions.width}
                  pageHeight={pageDimensions.height}
                  updateTextAttachment={handleAttachmentUpdate(index)}
                  {...(attachment as TextAttachment)}
                />
              );
            }
            return null;
          })
        : null}
    </>
  ) : null;
};
