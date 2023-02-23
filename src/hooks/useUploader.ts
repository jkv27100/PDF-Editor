import React, { useState, createRef } from "react";
import { IPDFDoc } from "../interface";
import { readAsPDF } from "../utils/asyncReader";

export enum UploadTypes {
  PDF = "pdf",
}

const handlers = {
  pdf: async (file: File) => {
    try {
      const pdf = await readAsPDF(file);
      return {
        file,
        name: file.name,
        pages: Array(pdf.numPages)
          .fill(0)
          .map((_, index) => pdf.getPage(index + 1)),
      } as IPDFDoc;
    } catch (error) {
      console.log("Failed to load pdf", error);
      throw new Error("Failed to load PDF");
    }
  },
};

/**
 * @function useUploader
 *
 * @description This hook handles pdf and image uploads
 *
 * @
 * @param use UploadTypes
 */
export const useUploader = ({
  use,
  afterUploadPdf,
}: {
  use: UploadTypes;
  afterUploadPdf?: (upload: IPDFDoc) => void;
  afterUploadAttachment?: (upload: Attachment) => void;
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = createRef<HTMLInputElement>();

  const onClick = (event: ActionEvent<HTMLInputElement>) => {
    event.currentTarget.value = "";
  };

  const handleClick = () => {
    const input = inputRef.current;

    if (input) {
      setIsUploading(true);
      input.click();
    }
  };

  const upload = async (
    event: React.ChangeEvent<HTMLInputElement> & { dataTransfer?: DataTransfer }
  ) => {
    if (!isUploading) {
      return;
    }

    const files: FileList | undefined =
      event.currentTarget.files ||
      (event.dataTransfer && event.dataTransfer.files);
    if (!files) {
      setIsUploading(false);
      return;
    }

    const file = files[0];

    const result = await handlers[use](file);

    if (use === UploadTypes.PDF && afterUploadPdf) {
      afterUploadPdf(result as IPDFDoc);
    }

    setIsUploading(false);
    return;
  };

  return {
    upload,
    onClick,
    inputRef,
    isUploading,
    handleClick,
  };
};
