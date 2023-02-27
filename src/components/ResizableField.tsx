import { RefObject, useEffect, useRef } from 'react';
import { TextMode } from '../entities';
import styles from '../styles/resizableField.module.css';
import makeResizableElement from '../utils/makeResizableElement';

interface IProps {
  inputRef: RefObject<HTMLInputElement>;
  id: string;
  mode: string;
  size?: number;
  placeholder?: string;
  lineHeight?: number;
  fontFamily?: string;
  positionTop: number;
  positionLeft: number;
  handleMouseDown: DragEventListener<HTMLDivElement>;
  handleMouseUp: DragEventListener<HTMLDivElement>;
  handleMouseMove: DragEventListener<HTMLDivElement>;
  handleMouseOut: DragEventListener<HTMLDivElement>;
  toggleEditMode: () => void;
  onChangeText: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAttachmentRemove: () => void;
}

function ResizableField({
  inputRef,
  id,
  mode,
  size,
  placeholder,
  fontFamily,
  positionTop,
  positionLeft,
  onChangeText,
  toggleEditMode,
  handleMouseDown,
  handleMouseMove,
  handleMouseOut,
  handleMouseUp,
  lineHeight,
  handleAttachmentRemove,
}: IProps) {
  const resizeDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (resizeDivRef.current && inputRef.current) {
      makeResizableElement(
        resizeDivRef.current,
        document.querySelectorAll('#resizer'),
        inputRef.current,
        positionLeft,
        positionTop
      );
    }
  }, []);

  return (
    <div
      ref={resizeDivRef}
      className={styles.resizable}
      onDoubleClick={toggleEditMode}
      onMouseDown={handleMouseDown}
      id={id}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseOut={handleMouseOut}
      style={{
        fontFamily,
        fontSize: size,
        lineHeight,
        cursor: `${mode === TextMode.COMMAND ? 'move' : 'default'},all-scroll`,
        top: positionTop,
        left: positionLeft,
      }}
    >
      <div id={id} className={styles.resizers}>
        <div id='remove' className={`${styles.removeIcon}`} onClick={handleAttachmentRemove}>
          &times;
        </div>
        {/* change accessing resizers by classname because when you resize one everything else will resize */}
        <div id='resizer' className={`${styles.resizer} ${styles.top} topResizer`}></div>
        <div id='resizer' className={`${styles.resizer} ${styles.topRight} topRightResizer`}></div>
        <div id='resizer' className={`${styles.resizer} ${styles.right} rightResizer`}></div>
        <div
          id='resizer'
          className={`${styles.resizer} ${styles.bottomRight} bottomRightResizer`}
        ></div>
        <div id='resizer' className={`${styles.resizer} ${styles.bottom} bottomResizer`}></div>
        <div
          id='resizer'
          className={`${styles.resizer} ${styles.bottomLeft} bottomLeftResizer`}
        ></div>
        <div id='resizer' className={`${styles.resizer} ${styles.left} leftResizer`}></div>
        <div id='resizer' className={`${styles.resizer} ${styles.topLeft} topLeftResizer`}></div>
      </div>
      <input
        type='text'
        ref={inputRef}
        placeholder={placeholder}
        onChange={onChangeText}
        readOnly={mode === TextMode.COMMAND}
        style={{
          fontFamily,
          fontSize: size,
          lineHeight,
          cursor: mode === TextMode.COMMAND ? 'move' : 'text',
        }}
        className={styles.resizableInput}
      />
    </div>
  );
}

export default ResizableField;
