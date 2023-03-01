import { useEffect, useRef } from 'react';
import { TextMode } from '../entities';
import { IRNDFieldProps } from '../interface';
import styles from '../styles/RNDField.module.css';
import makeResizableElement from '../utils/makeResizableElement';

function RNDField({
  labelRef,
  id,
  mode,
  size,
  text,
  fontFamily,
  positionTop,
  positionLeft,
  handleMouseDown,
  handleMouseMove,
  handleMouseOut,
  handleMouseUp,
  lineHeight,
  handleAttachmentRemove,
}: IRNDFieldProps) {
  const resizeDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (resizeDivRef.current && labelRef.current) {
      makeResizableElement(
        resizeDivRef.current,
        document.querySelectorAll('#resizer'),
        labelRef.current,
        positionLeft,
        positionTop
      );
    }
  }, []);

  return (
    <div
      ref={resizeDivRef}
      className={styles.resizable}
      id={id}
      style={{
        fontFamily,
        lineHeight,
        top: positionTop,
        left: positionLeft,
      }}
    >
      <div id={id} className={styles.resizers}>
        <div id='remove' className={`${styles.removeIcon}`} onClick={handleAttachmentRemove}>
          &times;
        </div>
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
      <label
        ref={labelRef}
        className={styles.label}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseOut}
        style={{
          fontFamily,
          lineHeight,
          fontSize: size,
          cursor: mode === TextMode.COMMAND ? 'move' : 'default',
        }}
      >
        {text}
      </label>
    </div>
  );
}

export default RNDField;
