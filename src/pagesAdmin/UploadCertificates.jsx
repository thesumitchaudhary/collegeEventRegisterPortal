import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { issueCertificate } from "../lib/IssueCetificates";
import { Button } from "../components/ui/button";

export default function UploadCertificates() {
  const [registrations, setRegistrations] = useState([]);

  // ✅ Fetch registrations on component mount
  useEffect(() => {
    fetchRegistrations();
  }, []);

  // ✅ Mark function as async to use await
  async function fetchRegistrations() {
    try {
      const { data, error } = await supabase
        .from("registrations")
        .select(`
          id,
          user:user_id!fk_user ( name ),
          event:event_id!fk_event ( title, date ),
          certificates ( id, certificate_url )
        `);

      if (error) throw error;

      setRegistrations(data);
    } catch (err) {
      console.error("Error fetching registrations:", err.message);
      alert("Failed to load registrations");
    }
  }

  // ✅ Issue certificate for a single registration
  const handleIssue = async (registrationId) => {
    await issueCertificate(registrationId);
    fetchRegistrations(); // refresh the list after issuing
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Upload Certificates</h2>

      {registrations.length === 0 ? (
        <p>No registrations found.</p>
      ) : (
        <div className="space-y-4">
          {registrations.map((reg) => (
            <div
              key={reg.id}
              className="border rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center"
            >
              <div>
                <p><strong>Name:</strong> {reg.user.name}</p>
                <p><strong>Event:</strong> {reg.event.event_name}</p>
                <p><strong>Date:</strong> {reg.event.event_date}</p>
                {reg.certificates.length > 0 && (
                  <a
                    href={`https://<your-project>.supabase.co/storage/v1/object/public/certificates/${reg.certificates[0].certificate_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View Certificate
                  </a>
                )}
              </div>

              {reg.certificates.length === 0 && (
                <Button onClick={() => handleIssue(reg.id)} className="mt-2 md:mt-0">
                  Issue Certificate
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
