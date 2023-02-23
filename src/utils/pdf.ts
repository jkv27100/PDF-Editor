import { readAsArrayBuffer } from "./asyncReader";
import { PDFDocument } from "pdf-lib";
import download from "downloadjs";
import { ITextAttachment } from "../interface";

export async function save(
  pdfFile: File,
  objects: Attachments[],
  name: string
) {
  let pdfDoc: PDFDocument;

  try {
    pdfDoc = await PDFDocument.load(
      (await readAsArrayBuffer(pdfFile)) as ArrayBuffer
    );
  } catch (e) {
    console.log("Failed to load PDF.");
    throw e;
  }

  const pagesProcesses = pdfDoc.getPages().map(async (page, pageIndex) => {
    const pageObjects = objects[pageIndex];

    const pageHeight = page.getHeight();
    const embedProcesses = pageObjects.map(async (object: Attachment) => {
      if (object.type === "text") {
        const { x, y, text, lineHeight, size, fontFamily, width } =
          object as ITextAttachment;

        if (text && fontFamily) {
          const pdfFont = await pdfDoc.embedFont(fontFamily);
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
      }
    });
    // embed objects in order
    const drawProcesses: any[] = await Promise.all(embedProcesses);
    drawProcesses.forEach((p) => p());
  });
  await Promise.all(pagesProcesses);
  try {
    const pdfBytes = await pdfDoc.save();
    download(pdfBytes, name, "application/pdf");
  } catch (e) {
    console.log("Failed to save PDF.");
    throw e;
  }
}
