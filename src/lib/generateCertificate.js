import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export default async function generateCertificate({ studentName, eventName, date, returnBytes = false }) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]);

  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

  page.drawText("Certificate of Participation", {
    x: 150,
    y: 350,
    size: 24,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });

  page.drawText(`Awarded to: ${studentName}`, {
    x: 50,
    y: 300,
    size: 18,
    font: timesRomanFont,
  });

  page.drawText(`For participating in: ${eventName}`, {
    x: 50,
    y: 270,
    size: 18,
    font: timesRomanFont,
  });

  page.drawText(`Date: ${date}`, {
    x: 50,
    y: 240,
    size: 14,
    font: timesRomanFont,
  });

  const pdfBytes = await pdfDoc.save();

  if (returnBytes) {
    return pdfBytes;
  }

  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${studentName}_certificate.pdf`;
  link.click();
}
