import { useContext } from 'react';
import { AttachmentContext, AttachmentContextType } from '../context/AttachmentContext';
import { IStore } from '../interface';

export const useAttachments = () => {
  const { store, setStore } = useContext(AttachmentContext) as AttachmentContextType;
  const { allPageAttachments, pageAttachments, pageIndex } = store;

  const addAttachment = (newAttachment: Attachment) => {
    if (allPageAttachments.length === 0) {
      let newStore: IStore = {
        ...store,
        allPageAttachments: [[newAttachment]],
        pageAttachments: [newAttachment],
      };
      setStore(newStore);
    } else {
      const newAllPageAttachmentsAdd = allPageAttachments.map((attachments, index) =>
        pageIndex === index ? [...attachments, newAttachment] : attachments
      );

      let newStore: IStore = {
        ...store,
        allPageAttachments: newAllPageAttachmentsAdd,
        pageAttachments: newAllPageAttachmentsAdd[pageIndex],
      };

      setStore(newStore);
    }
  };
  const removeAttachment = (attachmentIndex: number) => {
    const newAllPageAttachmentsRemove = allPageAttachments.map((otherPageAttachments, index) => {
      if (pageIndex === index) {
        return pageAttachments.filter(
          (_, _attachmentIndex) => _attachmentIndex !== attachmentIndex
        );
      }
      return otherPageAttachments;
    });

    const newStore: IStore = {
      ...store,
      allPageAttachments: newAllPageAttachmentsRemove,
      pageAttachments: newAllPageAttachmentsRemove[pageIndex],
    };
    setStore(newStore);
    console.log(store);
  };

  const setPageIndex = (newPageIndex: number) => {
    let newStore: IStore = {
      ...store,
      pageIndex: newPageIndex,
      pageAttachments: allPageAttachments[newPageIndex],
    };
    setStore(newStore);
  };

  const resetAttachments = (numberOfPages: number) => {
    let newStore: IStore = {
      pageIndex: 0,
      pageAttachments: [],
      allPageAttachments: Array(numberOfPages).fill([]),
    };

    setStore(newStore);
  };

  const updateAttachement = (attachmentIndex: number, attachment: Partial<Attachment>) => {
    if (pageIndex === -1) {
      return;
    }
    const newAllPageAttachmentsUpdate = allPageAttachments.map((otherPageAttachments, index) =>
      pageIndex === index
        ? pageAttachments.map((oldAttachment, _attachmentIndex) =>
            _attachmentIndex === attachmentIndex
              ? { ...oldAttachment, ...attachment }
              : oldAttachment
          )
        : otherPageAttachments
    );

    const newStore: IStore = {
      ...store,
      allPageAttachments: newAllPageAttachmentsUpdate as Attachments[],
      pageAttachments: newAllPageAttachmentsUpdate[pageIndex] as Attachment[],
    };
    setStore(newStore);
  };

  return {
    addAttachment,
    removeAttachment,
    updateAttachement,
    setPageIndex,
    resetAttachments,
    allPageAttachments,
    pageAttachments,
    pageIndex,
    store,
  };
};
