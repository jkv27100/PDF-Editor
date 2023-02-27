import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import { IPDFPage } from '../interface';

//This is essential for pdfjs-dist to work
GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.3.122/pdf.worker.js';

/**
 * This fuction is to read PDF file
 * @param  file This is of type File
 * @returns Promise<string | ArrayBuffer | null>
 * */

export const readAsArrayBuffer = (file: File): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};

/**
 * This fuction is to read PDF file
 * @param  file This is of type File
 * @returns Promise<string | ArrayBuffer | null>
 * */

export const readAsDataURL = (file: File): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * This fuction is to read PDF file
 * @param  file This is of type File
 * @returns This function returns an object of type PDF
 * */

export const readAsPDF = async (file: File): Promise<IPDFPage> => {
  const blob = new Blob([file]);
  const url = window.URL.createObjectURL(blob);
  const data = getDocument(url).promise;
  return data;
};
