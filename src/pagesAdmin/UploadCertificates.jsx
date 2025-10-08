import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { issueCertificate } from "../lib/IssueCetificates";
import { Button } from "../components/ui/button";
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
      const { data, error } = await supabase
        .from("registrations")
        .select(`
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
          <h1 className="text-6xl font-semibold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            🏆 Certificate Management Portal
          </h1>
          <Link 
            to="/admin" 
            className="inline-block bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            🏠 Home
          </Link>
        </header>

        <main className="p-6 max-w-6xl mx-auto space-y-8 z-[10]">
          <div className="bg-gradient-to-br from-slate-800 via-purple-900 to-slate-900 border-purple-500/20 shadow-2xl rounded-xl p-8">
            <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-pink-400 via-red-500 to-yellow-500 bg-clip-text text-transparent">
              📜 Upload & Issue Certificates
            </h2>

            {registrations.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📋</div>
                <p className="text-gray-300 text-xl bg-gradient-to-r from-slate-700 to-slate-600 rounded-xl p-8 inline-block">
                  🔍 No registrations found. Check back later for new registrations!
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="mb-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/30 rounded-lg">
                  <p className="text-center text-blue-200 font-medium">
                    📊 Total Registrations: <span className="text-white font-bold text-lg">{registrations.length}</span>
                  </p>
                </div>

                {registrations.map((reg) => (
                  <div
                    key={reg.id}
                    className="bg-gradient-to-br from-slate-800 via-indigo-900 to-slate-900 border-indigo-500/20 shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 p-6 rounded-xl hover:scale-[1.02] group"
                  >
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                      <div className="flex-1 space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">👤</span>
                            <div>
                              <p className="text-sm text-gray-400 font-medium">Participant Name</p>
                              <p className="text-white font-semibold text-lg">{reg.user.name}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">🎯</span>
                            <div>
                              <p className="text-sm text-gray-400 font-medium">Event Title</p>
                              <p className="text-blue-300 font-semibold">{reg.event.title}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">📅</span>
                            <div>
                              <p className="text-sm text-gray-400 font-medium">Event Date</p>
                              <p className="text-emerald-300 font-semibold">{reg.event.date}</p>
                            </div>
                          </div>
                        </div>

                        {reg.certificates.length > 0 && (
                          <div className="mt-4 p-3 bg-green-500/10 border border-green-400/30 rounded-lg">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">✅</span>
                              <div>
                                <p className="text-green-300 font-medium">Certificate Issued</p>
                                <a
                                  href={`https://<your-project>.supabase.co/storage/v1/object/public/certificates/${reg.certificates[0].certificate_url}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-block mt-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 text-sm"
                                >
                                  🔗 View Certificate
                                </a>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col items-center gap-3">
                        {reg.certificates.length === 0 ? (
                          <div className="text-center">
                            <div className="text-3xl mb-2">⏳</div>
                            <p className="text-yellow-300 text-sm font-medium mb-3">Pending Certificate</p>
                            <Button 
                              onClick={() => handleIssue(reg.id)}
                              className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white border-0 transform transition-all duration-300 hover:scale-105 hover:shadow-lg px-6 py-3"
                            >
                              🏆 Issue Certificate
                            </Button>
                          </div>
                        ) : (
                          <div className="text-center">
                            <div className="text-4xl mb-2">🎉</div>
                            <p className="text-green-300 font-semibold">Certificate Ready!</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Statistics Summary */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-green-800 via-emerald-900 to-teal-800 border-green-500/20 shadow-xl rounded-lg p-6 text-center">
                    <div className="text-3xl mb-2">✅</div>
                    <h3 className="text-xl font-bold text-green-300 mb-2">Certificates Issued</h3>
                    <p className="text-3xl font-bold text-white">
                      {registrations.filter(reg => reg.certificates.length > 0).length}
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-orange-800 via-red-900 to-pink-800 border-orange-500/20 shadow-xl rounded-lg p-6 text-center">
                    <div className="text-3xl mb-2">⏳</div>
                    <h3 className="text-xl font-bold text-orange-300 mb-2">Pending Certificates</h3>
                    <p className="text-3xl font-bold text-white">
                      {registrations.filter(reg => reg.certificates.length === 0).length}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
