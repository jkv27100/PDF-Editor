import React, { useState, useRef } from 'react';
import { getMovePosition } from '../utils/helpers';
import { DragActions, TextMode } from '../entities';
import { ITextAttachment } from '../interface';
import RNDField from '../components/RNDField';
import { useAttachments } from '../hooks/useAttachments';

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
  text,
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
  const labelRef = useRef<HTMLLabelElement>(null);
  const [mouseDown, setMouseDown] = useState(false);
  const [positionTop, setPositionTop] = useState(y);
  const [positionLeft, setPositionLeft] = useState(x);
  const [operation, setOperation] = useState<DragActions>(DragActions.NO_MOVEMENT);
  const [textMode, setTextMode] = useState<TextMode>(TextMode.COMMAND);

  const { removeAttachment } = useAttachments();

  const handleMouseMove = (event: React.MouseEvent<HTMLLabelElement>) => {
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

  const handleMousedown = (event: React.MouseEvent<HTMLLabelElement>) => {
    if (textMode !== TextMode.COMMAND) {
      return;
    }

    setMouseDown(true);
    setOperation(DragActions.MOVE);
  };

  const handleMouseUp = (event: React.MouseEvent<HTMLLabelElement>) => {
    event.preventDefault();

    if (textMode !== TextMode.COMMAND) {
      return;
    }

    setMouseDown(false);

    if (operation === DragActions.MOVE) {
      const element = event.target as HTMLLabelElement;

      const rect = element.getBoundingClientRect();

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

  const handleMouseOut = (event: React.MouseEvent<HTMLLabelElement>) => {
    if (operation === DragActions.MOVE) {
      handleMouseUp(event);
    }
  };

  const handleAttachmentRemove = () => {
    removeAttachment(attachmentIndex);
  };

  return (
    <RNDField
      id={id}
      handleAttachmentRemove={handleAttachmentRemove}
      mode={textMode}
      text={text}
      size={size}
      lineHeight={lineHeight}
      labelRef={labelRef}
      fontFamily={fontFamily}
      positionTop={positionTop}
      positionLeft={positionLeft}
      handleMouseUp={handleMouseUp}
      handleMouseOut={handleMouseOut}
      handleMouseDown={handleMousedown}
      handleMouseMove={handleMouseMove}
    />
  );
};
