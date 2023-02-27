import React, { useState, useRef, useContext } from 'react';
import { Text as Component } from '../components/Text';
import { getMovePosition } from '../utils/helpers';
import { DragActions, TextMode } from '../entities';
import { ITextAttachment } from '../interface';
import ResizableField from '../components/ResizableField';
import { useAttachments } from '../hooks/useAttachments';
import { AttachmentContext, AttachmentContextType } from '../context/AttachmentContext';

interface IProps {
  pageWidth: number;
  pageHeight: number;
  updateTextAttachment: (textObject: Partial<ITextAttachment>) => void;
  attachmentIndex: number;
}

export const Text = ({
  id,
  x,
  y,
  placeholder,
  width,
  height,
  lineHeight,
  size,
  fontFamily,
  pageHeight,
  pageWidth,
  updateTextAttachment,
  attachmentIndex,
}: ITextAttachment & IProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState(placeholder || '');
  const [mouseDown, setMouseDown] = useState(false);
  const [positionTop, setPositionTop] = useState(y);
  const [positionLeft, setPositionLeft] = useState(x);
  const [operation, setOperation] = useState<DragActions>(DragActions.NO_MOVEMENT);
  const [textMode, setTextMode] = useState<TextMode>(TextMode.COMMAND);

  const { remove } = useAttachments();

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (mouseDown) {
      const { top, left } = getMovePosition(
        positionLeft,
        positionTop,
        event.movementX,
        event.movementY,
        width,
        height,
        pageWidth,
        pageHeight
      );

      setPositionTop(top);
      setPositionLeft(left);
    }
  };

  const handleMousedown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (textMode !== TextMode.COMMAND) {
      return;
    }

    setMouseDown(true);
    setOperation(DragActions.MOVE);
  };

  const handleMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (textMode !== TextMode.COMMAND) {
      return;
    }

    setMouseDown(false);

    if (operation === DragActions.MOVE) {
      const { top, left } = getMovePosition(
        positionLeft,
        positionTop,
        event.movementX,
        event.movementY,
        width,
        height,
        pageWidth,
        pageHeight
      );

      updateTextAttachment({
        x: left,
        y: top,
      });
    }

    setOperation(DragActions.NO_MOVEMENT);
  };

  const handleMouseOut = (event: React.MouseEvent<HTMLDivElement>) => {
    if (operation === DragActions.MOVE) {
      handleMouseUp(event);
    }

    if (textMode === TextMode.INSERT) {
      setTextMode(TextMode.COMMAND);
      prepareTextAndUpdate();
    }
  };

  const prepareTextAndUpdate = () => {
    // Deselect any selection when returning to command mode
    document.getSelection()?.removeAllRanges();

    const lines = [content];
    updateTextAttachment({
      lines,
      placeholder: content,
    });
  };

  const toggleEditMode = () => {
    const input = inputRef.current;
    const mode = textMode === TextMode.COMMAND ? TextMode.INSERT : TextMode.COMMAND;

    setTextMode(mode);

    if (input && mode === TextMode.INSERT) {
      input.focus();
      input.select();
    } else {
      prepareTextAndUpdate();
    }
  };

  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setContent(value);
  };

  const { store, setStore } = useContext(AttachmentContext) as AttachmentContextType;

  console.log(store);
  const handleAttachmentRemove = () => {
    console.log('cliked on ', attachmentIndex);
    remove(attachmentIndex);
  };

  return (
    // <Component
    //   text={content}
    //   width={width}
    //   height={height}
    //   mode={textMode}
    //   size={size}
    //   lineHeight={lineHeight}
    //   inputRef={inputRef}
    //   fontFamily={fontFamily}
    //   positionTop={positionTop}
    //   onChangeText={onChangeText}
    //   positionLeft={positionLeft}
    //   handleMouseUp={handleMouseUp}
    //   toggleEditMode={toggleEditMode}
    //   handleMouseOut={handleMouseOut}
    //   handleMouseDown={handleMousedown}
    //   handleMouseMove={handleMouseMove}
    // />
    <ResizableField
      id={id}
      handleAttachmentRemove={handleAttachmentRemove}
      mode={textMode}
      placeholder={placeholder}
      size={size}
      lineHeight={lineHeight}
      inputRef={inputRef}
      fontFamily={fontFamily}
      positionTop={positionTop}
      onChangeText={onChangeText}
      positionLeft={positionLeft}
      toggleEditMode={toggleEditMode}
      handleMouseUp={handleMouseUp}
      handleMouseOut={handleMouseOut}
      handleMouseDown={handleMousedown}
      handleMouseMove={handleMouseMove}
    />
  );
};
