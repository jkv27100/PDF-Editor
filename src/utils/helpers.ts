import { IPosition } from '../interface';
import { v4 as uuid } from 'uuid';

export function ggID(): string {
  return uuid();
}

export const getMovePosition = (
  x: number,
  y: number,
  dragX: number,
  dragY: number,
  width: number,
  height: number,
  pageWidth: number,
  pageHeight: number
): IPosition => {
  const newPositionTop = y + dragY;
  const newPositionLeft = x + dragX;
  const newPositionRight = newPositionLeft + width;
  const newPositionBottom = newPositionTop + height;

  const top =
    newPositionTop < 0 ? 0 : newPositionBottom > pageHeight ? pageHeight - height : newPositionTop;
  const left =
    newPositionLeft < 0 ? 0 : newPositionRight > pageWidth ? pageWidth - width : newPositionLeft;

  return {
    top,
    left,
  };
};

export const normalize = (value: number): number => parseFloat((value / 255).toFixed(1));
