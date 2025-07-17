import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom"
import { supabase } from "../supabaseClient";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";


// Importing image
import herossectionImage from "../images/herossection-image.avif";

export const EditPrivacyPolicy = () => {
    const [policyId, setPolicyId] = useState(null); // Store ID for update/delete
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Fetch existing about_us entry
      useEffect(() => {
        const fetchAbout = async () => {
          const { data, error } = await supabase
            .from("privacypolicy")
            .select("*")
            .single();
          if (data) {
            setPolicyId(data.id);
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
            .from("privacypolicy")
            .insert([{ content }]);
    
          if (error) {
            console.error("Supabase Insert Error:", error);
            setMessage("Insert failed: " + (error.message || "Unknown error"));
          } else {
            setMessage("Insert successful!");
            setPolicyId(data?.[0]?.id || null);
          }
        } catch (e) {
          console.error("Unexpected error:", e);
          setMessage("Insert failed due to unexpected error.");
        }
    
        setLoading(false);
        setContent("")
      };
    
      // Update existing
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
    
      // Delete existing
      const handleDelete = async () => {
        if (!policyId) return;
        const confirm = window.confirm(
          "Are you sure you want to delete the About Us section?"
        );
        if (!confirm) return;
    
        setLoading(true);
        const { error } = await supabase.from("privacypolicy").delete().eq("id", policyId);
        if (error) {
          setMessage("Delete failed: " + error.message);
        } else {
          setMessage("Deleted successfully!");
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
        className="absolute  w-full h-full object-cover -z-[10]"
      />
      <div>
        <header className="flex justify-between p-4  text-white z-[10]">
          <h1 className="text-xl font-bold">CER</h1>
          <Link to="/admin">Home</Link>
        </header>

        <main>
           <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow space-y-4">
            <h2 className="text-2xl font-bold">Manage Privacy Policy</h2>

            <Textarea
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write About Us content..."
            />

            <div className="flex space-x-4">
              {!policyId && (
                <Button onClick={handleInsert} disabled={loading}>
                  Insert
                </Button>
              )}
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
