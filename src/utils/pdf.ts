import { readAsArrayBuffer } from './asyncReader';
import { PDFDocument } from 'pdf-lib';
import download from 'downloadjs';
import { ITextAttachment } from '../interface';

export async function save(pdfFile: File, objects: Attachments[], name: string) {
  let pdfDoc: PDFDocument;

  try {
    pdfDoc = await PDFDocument.load((await readAsArrayBuffer(pdfFile)) as ArrayBuffer);
  } catch (e) {
    console.log('Failed to load PDF.');
    throw e;
  }

  const pagesProcesses = pdfDoc.getPages().map(async (page, pageIndex) => {
    const pageObjects = objects[pageIndex];

    const pageHeight = page.getHeight();
    const embedProcesses = pageObjects.map(async (object: Attachment) => {
      console.log(object);
      if (object.type === 'text') {
        const { x, y, text, lineHeight, size, width } = object as ITextAttachment;

        if (text) {
          const pdfFont = await pdfDoc.embedFont('Times-Roman');
          return () =>
            page.drawText(text, {
              maxWidth: width,
              font: pdfFont,
              size,
              lineHeight,
              x,
              y: pageHeight - size! - y,
            });
        }
      } else if (object.type === 'image') {
        const { file, x, y, width, height } = object as ImageAttachment;
        let img: any;
        let imageFile = await readAsArrayBuffer(file);
        try {
          if (imageFile) {
            if (file.type === 'image/jpeg') {
              img = await pdfDoc.embedJpg(imageFile);
            } else {
              img = await pdfDoc.embedPng(imageFile);
            }
            return () =>
              page.drawImage(img, {
                x,
                y: pageHeight - y - height,
                width,
                height,
              });
          }
        } catch (e) {
          console.log('Failed to embed image.', e);
          throw e;
        }
      }
    });
    // embed objects in order
    const drawProcesses: any[] = await Promise.all(embedProcesses);
    drawProcesses.forEach(p => p());
  });
  await Promise.all(pagesProcesses);
  try {
    const pdfBytes = await pdfDoc.save();
    download(pdfBytes, name, 'application/pdf');
  } catch (e) {
    console.log('Failed to save PDF.');
    throw e;
  }
}
