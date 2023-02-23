type Attachment = ImageAttachment | TextAttachment;

type Attachments = Attachment[];

type DragEventListener<T> = (e: React.MouseEvent<T>) => void;

type AttachmentType = "image" | "text";

type ActionEvent<T> = React.TouchEvent<T> | React.MouseEvent<T>;
