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
    <div className="relative w-full text-white min-h-screen overflow-hidden">
      <img
        src={herossectionImage}
        alt="hero section"
        className="absolute w-full h-full object-cover -z-[10]"
      />

      <div>
        <header className="max-w-[50rem] mx-auto px-8 py-10 z-10 relative">
          <h1 className="text-6xl font-semibold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Welcome to College About Manage Page
          </h1>
          <Link 
            to="/admin" 
            className="inline-block bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            🏠 Home
          </Link>
        </header>
        
        <main className="p-6 max-w-4xl mx-auto space-y-6 z-[10]">
          <div className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-slate-800 via-purple-900 to-slate-900 border-purple-500/20 shadow-2xl rounded-xl space-y-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-400 via-red-500 to-yellow-500 bg-clip-text text-transparent">
              📝 Manage About Us
            </h2>

            <Textarea
              rows={12}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="📖 Write About Us content..."
              className="text-white bg-slate-700/50 border-purple-400/30 focus:border-purple-400 focus:ring-purple-400/20 placeholder:text-gray-300 min-h-[200px] resize-none"
            />

            <div className="flex space-x-4">
              {!aboutId && (
                <Button 
                  onClick={handleInsert} 
                  disabled={loading}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 transform transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "⏳ Inserting..." : "➕ Insert About Us"}
                </Button>
              )}
              {aboutId && (
                <>
                  <Button 
                    onClick={handleUpdate} 
                    disabled={loading}
                    className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white border-0 transform transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "⏳ Updating..." : "✏️ Update About Us"}
                  </Button>
                  <Button
                    onClick={handleDelete}
                    variant="destructive"
                    disabled={loading}
                    className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white border-0 transform transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "⏳ Deleting..." : "🗑️ Delete About Us"}
                  </Button>
                </>
              )}
            </div>

            {message && (
              <div className={`p-4 rounded-lg border ${
                message.includes('successful') || message.includes('Deleted successfully') 
                  ? 'bg-green-500/10 border-green-500/30 text-green-300' 
                  : message.includes('failed')
                  ? 'bg-red-500/10 border-red-500/30 text-red-300'
                  : 'bg-blue-500/10 border-blue-500/30 text-blue-300'
              }`}>
                <p className="text-sm font-medium flex items-center gap-2">
                  {message.includes('successful') || message.includes('Deleted successfully') ? '✅' : 
                   message.includes('failed') ? '❌' : 'ℹ️'}
                  {message}
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
