import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";

// Importing image
import herossectionImage from "../images/herossection-image.avif";

export const EditPrivacyPolicy = () => {
  const [policyId, setPolicyId] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch existing privacy policy
  useEffect(() => {
    const fetchPolicy = async () => {
      const { data, error } = await supabase
        .from("privacypolicy")
        .select("*")
        .single();

      if (error) {
        console.error("Fetch Error:", error.message);
        setMessage("Failed to load privacy policy.");
      } else if (data) {
        setPolicyId(data.id);
        setContent(data.content);
      } else {
        setMessage("No privacy policy found.");
      }
    };
    fetchPolicy();
  }, []);

  // Update existing policy
  const handleUpdate = async () => {
    if (!policyId) return;

    setLoading(true);
    const { error } = await supabase
      .from("privacypolicy")
      .update({ content, updated_at: new Date() })
      .eq("id", policyId);

    if (error) {
      setMessage("Update failed: " + error.message);
    } else {
      setMessage("Update successful!");
    }

    setLoading(false);
  };

  // Delete existing policy
  const handleDelete = async () => {
    if (!policyId) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete the Privacy Policy?"
    );
    if (!confirmDelete) return;

    setLoading(true);
    const { error } = await supabase
      .from("privacypolicy")
      .delete()
      .eq("id", policyId);

    if (error) {
      setMessage("Delete failed: " + error.message);
    } else {
      setMessage("Privacy Policy deleted.");
      setPolicyId(null);
      setContent("");
    }

    setLoading(false);
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
                <h1 className="text-6xl font-semibold mb-6">Welcome to College Edit Privacy Policy Page</h1>
                <Link to="/admin">Home</Link>
              </header>

        <main>
          <div className="max-w-3xl mx-auto mt-10 p-6 bg-black rounded-xl shadow space-y-4">
            <h2 className="text-2xl font-bold">Manage Privacy Policy</h2>

            <Textarea
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Edit Privacy Policy content..."
              disabled={!policyId}
            />

            <div className="flex space-x-4">
              {policyId && (
                <>
                  <Button onClick={handleUpdate} disabled={loading}>
                    Update
                  </Button>
                  <Button
                    onClick={handleDelete}
                    variant="destructive"
                    disabled={loading}
                  >
                    Delete
                  </Button>
                </>
              )}
            </div>

            {message && <p className="text-sm text-gray-600 mt-2">{message}</p>}
          </div>
        </main>
      </div>
    </div>
  );
};
