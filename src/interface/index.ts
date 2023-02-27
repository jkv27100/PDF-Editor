export interface IStore {
  pageIndex: number;
  allPageAttachments: Attachments[];
  pageAttachments: Attachments;
}

export interface ITextAttachment extends IAttachmentBase {
  placeholder?: string;
  fontFamily?: string;
  size?: number;
  lineHeight?: number;
  lines?: string[];
}

export interface IDimensions {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface IPosition {
  top: number;
  left: number;
}

export interface IAttachmentBase {
  id: string;
  width: number;
  height: number;
  x: number;
  y: number;
  type: AttachmentType;
}

export interface IPDFPage {
  numPages: number;
  getPage: (index: number) => Promise<any>;
}

export interface IPDFDoc {
  name: string;
  file: File;
  pages: Promise<any>[];
}

export interface ImageAttachment extends IAttachmentBase {
  file: File;
  img: HTMLImageElement;
}
