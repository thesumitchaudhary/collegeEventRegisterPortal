import React, { useEffect, useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import herossectionImage from "../images/herossection-image.avif";

export default function ManageFAQs() {
  const [faqs, setFaqs] = useState([]);
  const [formData, setFormData] = useState({ question: "", answer: "" });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch FAQs on component mount
  useEffect(() => {
    fetchFAQs();
  }, []);

  // READ
  const fetchFAQs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("faqs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to fetch FAQs:", error.message);
    } else {
      setFaqs(data);
    }
    setLoading(false);
  };

  // INSERT or UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();
    const timestamp = new Date().toISOString();

    if (editingId) {
      // UPDATE
      const { error } = await supabase
        .from("faqs")
        .update({
          question: formData.question,
          answer: formData.answer,
          updated_at: timestamp,
        })
        .eq("id", editingId);

      if (error) {
        console.error("Failed to update FAQ:", error.message);
      } else {
        console.log("FAQ updated successfully");
      }
    } else {
      // INSERT
      const { error } = await supabase.from("faqs").insert([
        {
          question: formData.question,
          answer: formData.answer,
          created_at: timestamp,
          updated_at: timestamp,
        },
      ]);

      if (error) {
        console.error("Failed to insert FAQ:", error.message);
      } else {
        console.log("FAQ inserted successfully");
      }
    }

    setFormData({ question: "", answer: "" });
    setEditingId(null);
    fetchFAQs();
  };

  // Edit
  const handleEdit = (faq) => {
    setFormData({ question: faq.question, answer: faq.answer });
    setEditingId(faq.id);
  };

  // Delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this FAQ?"
    );
    if (!confirmDelete) return;

    const { error } = await supabase.from("faqs").delete().eq("id", id);
    if (error) {
      console.error("Failed to delete FAQ:", error.message);
    } else {
      console.log("FAQ deleted successfully");
      fetchFAQs();
    }
  };

  return (
    <div className="relative w-full text-white min-h-screen overflow-hidden">
      <img
        src={herossectionImage}
        alt="hero section"
        className="absolute w-full h-full object-cover -z-[10]"
      />
      <header className="max-w-[50rem] mx-auto px-8 py-10 z-10 relative">
        <h1 className="text-6xl font-semibold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
          Welcome to College FAQs Manage Page
        </h1>
        <Link 
          to="/admin" 
          className="inline-block bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          🏠 Home
        </Link>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8 z-[10] space-y-8">
        <div className="bg-gradient-to-br from-slate-800 via-purple-900 to-slate-900 border-purple-500/20 shadow-2xl rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-red-500 to-yellow-500 bg-clip-text text-transparent">
            ❓ Manage FAQs
          </h2>

          {/* INSERT / UPDATE FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              placeholder="❓ Enter your question..."
              value={formData.question}
              onChange={(e) =>
                setFormData({ ...formData, question: e.target.value })
              }
              required
              className="text-white bg-slate-700/50 border-purple-400/30 focus:border-purple-400 focus:ring-purple-400/20 placeholder:text-gray-300"
            />
            <Textarea
              placeholder="💬 Enter the answer..."
              value={formData.answer}
              onChange={(e) =>
                setFormData({ ...formData, answer: e.target.value })
              }
              required
              rows={5}
              className="text-white bg-slate-700/50 border-purple-400/30 focus:border-purple-400 focus:ring-purple-400/20 placeholder:text-gray-300 resize-none"
            />
            <div className="flex gap-4">
              <Button 
                type="submit"
                className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white border-0 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                {editingId ? "✏️ Update FAQ" : "➕ Add FAQ"}
              </Button>
              {editingId && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setFormData({ question: "", answer: "" });
                    setEditingId(null);
                  }}
                  className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white border-0 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  ❌ Cancel
                </Button>
              )}
            </div>
          </form>
        </div>

        {/* FAQ LIST */}
        <div>
          <h3 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-emerald-400 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
            📋 All FAQs
          </h3>
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-300 text-lg bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-8 inline-block">
                ⏳ Loading FAQs...
              </p>
            </div>
          ) : faqs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-300 text-lg bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-8 inline-block">
                ❓ No FAQs found. Add your first FAQ above!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-gradient-to-br from-slate-800 via-indigo-900 to-slate-900 border-indigo-500/20 shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 p-6 rounded-xl hover:scale-[1.02] group"
                >
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                      ❓ {faq.question}
                    </h3>
                    <p className="text-gray-200 leading-relaxed pl-6">
                      💬 {faq.answer}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <p className="text-cyan-300 flex items-center gap-2">
                        🕒 Created: {new Date(faq.created_at).toLocaleString()}
                      </p>
                      <p className="text-emerald-300 flex items-center gap-2">
                        ✏️ Updated: {faq.updated_at ? new Date(faq.updated_at).toLocaleString() : "—"}
                      </p>
                    </div>
                    <div className="flex gap-3 pt-4 border-t border-gray-600/30">
                      <Button 
                        onClick={() => handleEdit(faq)}
                        className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      >
                        ✏️ Edit
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(faq.id)}
                        className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white border-0 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      >
                        🗑️ Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
