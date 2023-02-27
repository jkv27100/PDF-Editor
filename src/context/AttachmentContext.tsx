import { createContext, Dispatch, useState } from 'react';
import { IStore } from '../interface';

const initialState: IStore = {
  pageIndex: -1,
  allPageAttachments: [],
  pageAttachments: [],
};

export type AttachmentContextType = {
  store: IStore;
  setStore: Dispatch<React.SetStateAction<IStore>>;
};

export const AttachmentContext = createContext<AttachmentContextType | null>(null);

const AttachmentProvider = ({ children }: any) => {
  const [store, setStore] = useState<IStore>(initialState);
  return (
    <AttachmentContext.Provider value={{ store, setStore }}>{children}</AttachmentContext.Provider>
  );
};

export default AttachmentProvider;
