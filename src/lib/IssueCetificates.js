import { supabase } from "../supabaseClient";
import generateCertificate from "./generateCertificate"; // default import
import { format } from "date-fns";

export async function issueCertificate(registration_id) {
  try {
    // ✅ Step 1: Fetch registration data with joined user and event
    const { data, error } = await supabase
      .from("registrations")
      .select(
        `
        id,
        user:user_id (
          name
        ),
        event:event_id (
          title,
          event_date
        )
      `
      )
      .eq("id", registration_id)
      .single();

    if (error) throw error;

    const studentName = data.user.name;
    const eventName = data.event.title;
    const eventDate = new Date(data.event.event_date);
    const today = new Date();

    // ✅ Step 2: Prevent issuing if event is in future
    if (eventDate > today) {
      alert("❌ Certificate cannot be issued. Event has not occurred yet.");
      return;
    }

    // ✅ Step 3: Generate PDF certificate
    const pdfBytes = await generateCertificate({
      studentName,
      eventName,
      date: format(today, "dd/MM/yyyy"),
      returnBytes: true,
    });

    // ✅ Step 4: Upload to Supabase Storage
    const fileName = `cert-${registration_id}.pdf`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("certificates")
      .upload(fileName, new Blob([pdfBytes], { type: "application/pdf" }), {
        upsert: true,
      });

    if (uploadError) throw uploadError;

    // ✅ Step 5: Insert metadata into certificates table
    const serialNumber = `CERT-${Math.floor(100000 + Math.random() * 900000)}`;
    const { error: insertError } = await supabase.from("certificates").insert({
      registration_id,
      certificate_url: uploadData.path,
      serial_number: serialNumber,
    });

    // Before Step 3 in issueCertificate
    const { data: existingCert } = await supabase
      .from("certificates")
      .select("id")
      .eq("registration_id", registration_id)
      .single();

    if (existingCert) {
      alert("✅ Certificate already issued!");
      return;
    }

    if (insertError) throw insertError;

    alert("✅ Certificate issued successfully!");
  } catch (err) {
    console.error("❌ Error issuing certificate:", err.message);
    alert("❌ Failed to issue certificate. Check console for details.");
  }
}
