import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";

// Importing image
import herossectionImage from "../images/herossection-image.avif";

export default function ManageAboutPage() {
  const [aboutId, setAboutId] = useState(null); // Store ID for update/delete
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch existing about_us entry
  useEffect(() => {
    const fetchAbout = async () => {
      const { data, error } = await supabase
        .from("aboutus")
        .select("*")
        .single();
      if (data) {
        setAboutId(data.id);
        setContent(data.content);
      }
    };
    fetchAbout();
  }, []);

  // Insert new entry
  const handleInsert = async () => {
    setLoading(true);
    setMessage("");

    try {
      const { data, error } = await supabase
        .from("aboutus")
        .insert([{ content }]);

      if (error) {
        console.error("Supabase Insert Error:", error);
        setMessage("Insert failed: " + (error.message || "Unknown error"));
      } else {
        setMessage("Insert successful!");
        setAboutId(data?.[0]?.id || null);
      }
    } catch (e) {
      console.error("Unexpected error:", e);
      setMessage("Insert failed due to unexpected error.");
    }

    setLoading(false);
    setContent("");
  };

  // Update existing
  const handleUpdate = async () => {
    if (!aboutId) return;
    setLoading(true);
    const { error } = await supabase
      .from("aboutus")
      .update({ content, updated_at: new Date() })
      .eq("id", aboutId);
    if (error) {
      setMessage("Update failed: " + error.message);
    } else {
      setMessage("Update successful!");
    }
    setLoading(false);
  };

  // Delete existing
  const handleDelete = async () => {
    if (!aboutId) return;
    const confirm = window.confirm(
      "Are you sure you want to delete the About Us section?"
    );
    if (!confirm) return;

    setLoading(true);
    const { error } = await supabase.from("aboutus").delete().eq("id", aboutId);
    if (error) {
      setMessage("Delete failed: " + error.message);
    } else {
      setMessage("Deleted successfully!");
      setAboutId(null);
      setContent("");
    }
    setLoading(false);
  };

  return (
    <div>
      <img
        src={herossectionImage}
        alt="hero section"
        className="absolute  w-full h-[220rem] object-cover -z-[10]"
      />

      <div>
        <header className="max-w-[50rem] mx-auto px-8 py-10 z-10 relative">
          <h1 className="text-6xl text-white font-semibold mb-6">
            Welcome to College About Manage Page
          </h1>
          <Link to="/admin" className="text-white">Home</Link>
        </header>
        <main>
          <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow space-y-4">
            <h2 className="text-2xl font-bold">Manage About Us</h2>

            <Textarea
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write About Us content..."
            />

            <div className="flex space-x-4">
              {!aboutId && (
                <Button onClick={handleInsert} disabled={loading}>
                  Insert
                </Button>
              )}
              {aboutId && (
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
}
