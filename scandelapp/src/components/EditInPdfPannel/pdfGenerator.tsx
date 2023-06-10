import { PDFDocument, PageSizes } from 'pdf-lib';

export async function generatePDFDocument(): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage(PageSizes.A4);

  // Add content to the page (e.g., text, images, etc.)
  // Example:
  const text = 'Voici la synthèse de ce que vous préconise Scandela: ';
  const fontSize = 12; // Adjust the font size as needed
  const lineHeight = fontSize * 1.2; // Adjust the line height as needed

  const textWidth = page.getWidth() - 40; // Adjust the text width as needed
  const textHeight = page.getHeight() - 40; // Adjust the text height as needed

  const font = await pdfDoc.embedFont('Helvetica');
  const textWidthToFit = font.widthOfTextAtSize(text, fontSize);

  if (textWidthToFit > textWidth) {
    // Text is too wide, adjust position to fit on one line
    const scale = textWidth / textWidthToFit;
    const scaledFontSize = fontSize * scale;

    page.drawText(text, {
      x: 20, // Adjust the X position as needed
      y: textHeight - lineHeight, // Adjust the Y position as needed
      font,
      size: scaledFontSize,
      lineHeight: scaledFontSize * 1.2,
    });
  } else {
    // Text fits within the width, use original settings
    page.drawText(text, {
      x: 20, // Adjust the X position as needed
      y: textHeight - lineHeight, // Adjust the Y position as needed
      font,
      size: fontSize,
      lineHeight,
    });
  }

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}
