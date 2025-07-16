// src/pages/GenerateCertificate.jsx
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { supabase } from '../supabaseClient';
import { useEffect, useState } from 'react';

export default function UploadCertificate() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchEventData();
  }, []);

  const fetchEventData = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from('registrations')
      .select('user_name, event_name, event_date')
      .eq('user_id', user.id)
      .single();

    if (data) {
      setUserData({
        name: data.user_name,
        eventName: data.event_name,
        date: data.event_date,
      });
    }
  };

  const generateCertificate = async () => {
    const templateBytes = await fetch('/certificate-bg.png').then(res => res.arrayBuffer());

    const pdfDoc = await PDFDocument.create();
    const templateImage = await pdfDoc.embedPng(templateBytes);
    const page = pdfDoc.addPage([templateImage.width, templateImage.height]);

    page.drawImage(templateImage, {
      x: 0,
      y: 0,
      width: templateImage.width,
      height: templateImage.height,
    });

    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontSize = 24;
    const black = rgb(0, 0, 0);

    const name = userData?.name || "Student Name";
    const eventName = userData?.eventName || "Event Name";
    const date = userData?.date || "Date";

    // Centered name
    page.drawText(name, {
      x: page.getWidth() / 2 - (font.widthOfTextAtSize(name, fontSize) / 2),
      y: 300,
      size: fontSize,
      font,
      color: black,
    });

    page.drawText(`has participated in "${eventName}"`, {
      x: page.getWidth() / 2 - (font.widthOfTextAtSize(`has participated in "${eventName}"`, 18) / 2),
      y: 270,
      size: 18,
      font,
      color: black,
    });

    page.drawText(`Date: ${date}`, {
      x: 50,
      y: 50,
      size: 12,
      font,
      color: black,
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    saveAs(blob, `${name}_Certificate.pdf`);
  };

  if (!userData) return <p>Loading user info...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Download Your Certificate</h2>
      <button
        onClick={generateCertificate}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Generate PDF
      </button>
    </div>
  );
}
