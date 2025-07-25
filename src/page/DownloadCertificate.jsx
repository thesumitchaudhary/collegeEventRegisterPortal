// src/page/DownloadCertificate.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function DownloadCertificate() {
  const [certificateUrl, setCertificateUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCertificate = async () => {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        setError("User not logged in.");
        setLoading(false);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from('registrations')
        .select('certificate_url')
        .eq('user_id', user.id)
        .single();

      if (fetchError) {
        setError("Certificate not found.");
      } else {
        setCertificateUrl(data.certificate_url);
      }

      setLoading(false);
    };

    fetchCertificate();
  }, []);

  if (loading) return <p>Loading certificate...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Your Certificate</h2>

      {certificateUrl ? (
        <a
          href={certificateUrl}
          target="_blank"
          rel="noopener noreferrer"
          download
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
        >
          Download Certificate
        </a>
      ) : (
        <p>No certificate available.</p>
      )}
    </div>

  );
}
