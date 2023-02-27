type AttachmentType = 'image' | 'text';

interface AttachmentBase {
  id: string;
  width: number;
  height: number;
  x: number;
  y: number;
  type: AttachmentType;
}
interface ImageAttachment extends AttachmentBase {
  file: File;
  img: HTMLImageElement;
}

interface TextAttachment extends AttachmentBase {
  text?: string;
  fontFamily?: string;
  size?: number;
  lineHeight?: number;
  lines?: string[];
}

interface Dimensions {
  x: number;
  y: number;
  width: number;
  height: number;
}

type Attachment = ImageAttachment | TextAttachment;

type Attachments = Attachment[];

type DragEventListener<T> = (e: React.MouseEvent<T>) => void;

type ActionEvent<T> = React.TouchEvent<T> | React.MouseEvent<T>;
