import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { issueCertificate } from "../lib/IssueCetificates";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

// Importing image
import herossectionImage from "../images/herossection-image.avif";

export default function UploadCertificates() {
  const [registrations, setRegistrations] = useState([]);

  // ✅ Fetch registrations on component mount
  useEffect(() => {
    fetchRegistrations();
  }, []);

  // ✅ Mark function as async to use await
  async function fetchRegistrations() {
    try {
      const { data, error } = await supabase.from("registrations").select(`
          id,
          user:users!fk_user ( name ),
          event:events!fk_event ( title, date ),
          certificates ( id, certificate_url )
        `);
      // .select(`*`);

      console.log(data);

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
    <div className="relative w-full text-white min-h-screen overflow-hidden">
      <img
        src={herossectionImage}
        alt="hero section"
        className="absolute w-full h-full object-cover -z-[10]"
      />

      <div>
        <header className="max-w-[50rem] mx-auto px-8 py-10 z-10 relative">
          <h1 className="text-6xl font-semibold mb-6">
            Welcome to College Blog Manage Page
          </h1>
          <Link to="/admin">Home</Link>
        </header>

        <main className="p-6 max-w-4xl mx-auto space-y-6 z-[10]">
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
                      <p>
                        <strong>Name:</strong> {reg.user.name}
                      </p>
                      <p>
                        <strong>Event:</strong> {reg.event.title}
                      </p>
                      <p>
                        <strong>Date:</strong> {reg.event.date}
                      </p>
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
                      <Button
                        onClick={() => handleIssue(reg.id)}
                        className="mt-2 md:mt-0"
                      >
                        Issue Certificate
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
