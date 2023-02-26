import { RefObject, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { TextMode } from "../entities";
import styles from "../styles/resizableField.module.css";
import makeResizableElement from "../utils/makeResizableElement";

interface IProps {
  inputRef: RefObject<HTMLInputElement>;
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
}

function ResizableField({
  inputRef,
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
}: IProps) {
  const resizeDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (resizeDivRef.current && inputRef.current) {
      makeResizableElement(
        resizeDivRef.current,
        document.querySelectorAll("#resizer"),
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
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseOut={handleMouseOut}
      style={{
        fontFamily,
        fontSize: size,
        lineHeight,
        cursor: mode === TextMode.COMMAND ? "move" : "default",
        top: positionTop,
        left: positionLeft,
      }}
    >
      <div className={styles.resizers}>
        <div
          id="resizer"
          className={`${styles.resizer} ${styles.top} topResizer`}
        ></div>
        <div
          id="resizer"
          className={`${styles.resizer} ${styles.right} rightResizer`}
        ></div>
        <div
          id="resizer"
          className={`${styles.resizer} ${styles.bottom} bottomResizer`}
        ></div>
        <div
          id="resizer"
          className={`${styles.resizer} ${styles.left} leftResizer`}
        ></div>
      </div>
      <input
        type="text"
        ref={inputRef}
        placeholder={placeholder}
        onChange={onChangeText}
        readOnly={mode === TextMode.COMMAND}
        style={{
          fontFamily,
          fontSize: size,
          lineHeight,
          cursor: mode === TextMode.COMMAND ? "move" : "text",
        }}
        className={styles.resizableInput}
      />
    </div>
  );
}

export default ResizableField;
