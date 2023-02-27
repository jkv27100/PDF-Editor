import { useReducer, useCallback } from 'react';
import { ActionType } from '../entities';
import { IStore } from '../interface';

const initialState: IStore = {
  pageIndex: -1,
  allPageAttachments: [],
  pageAttachments: [],
};

type Action =
  | { type: ActionType.UPDATE_PAGE_INDEX; pageIndex: number }
  | { type: ActionType.ADD_ATTACHMENT; attachment: Attachment }
  | { type: ActionType.REMOVE_ATTACHMENT; attachmentIndex: number }
  | {
      type: ActionType.UPDATE_ATTACHMENT;
      attachmentIndex: number;
      attachment: Partial<Attachment>;
    }
  | { type: ActionType.RESET; numberOfPages: number };

const reducer = (state: IStore, action: Action) => {
  const { pageIndex, allPageAttachments, pageAttachments } = state;

  switch (action.type) {
    case ActionType.ADD_ATTACHMENT: {
      const newAllPageAttachmentsAdd = allPageAttachments.map((attachments, index) =>
        pageIndex === index ? [...attachments, action.attachment] : attachments
      );

      return {
        ...state,
        allPageAttachments: newAllPageAttachmentsAdd,
        pageAttachments: newAllPageAttachmentsAdd[pageIndex],
      };
    }
    case ActionType.REMOVE_ATTACHMENT: {
      console.log('on remove page index', pageIndex);
      const newAllPageAttachmentsRemove = allPageAttachments.map(
        (otherPageAttachments, index) => {
          if (pageIndex === index) {
            return pageAttachments.filter(
              (_, _attachmentIndex) => _attachmentIndex !== action.attachmentIndex
            );
          }
          return otherPageAttachments;
        }

        // pageIndex === index
        //   ? pageAttachments.filter(
        //       (_, _attachmentIndex) => _attachmentIndex !== action.attachmentIndex
        //     )
        //   : otherPageAttachments
      );
      console.log(newAllPageAttachmentsRemove);

      return {
        ...state,
        allPageAttachments: newAllPageAttachmentsRemove,
        pageAttachments: newAllPageAttachmentsRemove[pageIndex],
      };
    }
    case ActionType.UPDATE_ATTACHMENT: {
      if (pageIndex === -1) {
        return state;
      }

      const newAllPageAttachmentsUpdate = allPageAttachments.map((otherPageAttachments, index) =>
        pageIndex === index
          ? pageAttachments.map((oldAttachment, _attachmentIndex) =>
              _attachmentIndex === action.attachmentIndex
                ? { ...oldAttachment, ...action.attachment }
                : oldAttachment
            )
          : otherPageAttachments
      );

      return {
        ...state,
        allPageAttachments: newAllPageAttachmentsUpdate,
        pageAttachments: newAllPageAttachmentsUpdate[pageIndex],
      };
    }
    case ActionType.UPDATE_PAGE_INDEX: {
      console.log('on update page index', pageIndex);
      return {
        ...state,
        pageIndex: action.pageIndex,
        pageAttachments: allPageAttachments[action.pageIndex],
      };
    }
    case ActionType.RESET: {
      return {
        pageIndex: 0,
        pageAttachments: [],
        allPageAttachments: Array(action.numberOfPages).fill([]),
      };
    }
    default: {
      return state;
    }
  }
};

export const useAttachments = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { allPageAttachments, pageAttachments } = state;

  const add = (newAttachment: Attachment) =>
    dispatch({ type: ActionType.ADD_ATTACHMENT, attachment: newAttachment });

  const remove = (attachmentIndex: number) =>
    dispatch({ type: ActionType.REMOVE_ATTACHMENT, attachmentIndex });

  const update = (attachmentIndex: number, attachment: Partial<Attachment>) =>
    dispatch({
      type: ActionType.UPDATE_ATTACHMENT,
      attachmentIndex,
      attachment,
    });

  const reset = (numberOfPages: number) => dispatch({ type: ActionType.RESET, numberOfPages });

  const setPageIndex = useCallback(
    (index: number) => {
      console.log('number', index);
      dispatch({ type: ActionType.UPDATE_PAGE_INDEX, pageIndex: index });
    },
    [dispatch]
  );

  return {
    add,
    reset,
    remove,
    update,
    setPageIndex,
    pageAttachments,
    allPageAttachments,
  };
};
