import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";

GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.3.122/pdf.worker.js";

export const readAsArrayBuffer = (
  file: File
): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};

export const readAsDataURL = (
  file: File
): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

interface PDF {
  numPages: number;
  getPage: (index: number) => Promise<any>;
}

export const readAsPDF = async (file: File): Promise<PDF> => {
  const blob = new Blob([file]);
  const url = window.URL.createObjectURL(blob);
  const data = getDocument(url).promise;
  console.log(data);
  return data;
};
