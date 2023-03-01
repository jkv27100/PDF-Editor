export enum DragActions {
  MOVE = 'MOVE',
  SCALE = 'SCALE',
  NO_MOVEMENT = 'NO_MOVEMENT',
}

export enum ActionType {
  RESET = 'RESET',
  ADD_ATTACHMENT = 'ADD_ATTACHMENT',
  REMOVE_ATTACHMENT = 'REMOVE_ATTACHMENT',
  UPDATE_ATTACHMENT = 'UPDATE_ATTACHMENT',
  UPDATE_PAGE_INDEX = 'UPDATE_PAGE_INDEX',
}

export enum AttachmentTypes {
  IMAGE = 'image',
  DRAWING = 'drawing',
  TEXT = 'text',
}

export enum TextMode {
  INSERT = 'insert',
  COMMAND = 'command',
}
