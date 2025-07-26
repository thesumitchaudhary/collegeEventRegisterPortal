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
        <h1 className="text-6xl font-semibold mb-6">
          Welcome to College FAQs Manage Page
        </h1>
        <Link to="/admin">Home</Link>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8 z-[10]">
        <h2 className="text-2xl font-bold mb-4">Manage FAQs</h2>

        {/* INSERT / UPDATE FORM */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <Input
            placeholder="Question"
            value={formData.question}
            onChange={(e) =>
              setFormData({ ...formData, question: e.target.value })
            }
            required
          />
          <Textarea
            placeholder="Answer"
            value={formData.answer}
            onChange={(e) =>
              setFormData({ ...formData, answer: e.target.value })
            }
            required
          />
          <div className="flex gap-2">
            <Button type="submit">
              {editingId ? "Update FAQ" : "Add FAQ"}
            </Button>
            {editingId && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setFormData({ question: "", answer: "" });
                  setEditingId(null);
                }}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>

        {/* FAQ LIST */}
        {loading ? (
          <p className="text-center text-gray-300">Loading FAQs...</p>
        ) : (
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="border bg-white text-black p-4 rounded shadow-sm"
              >
                <h3 className="font-semibold">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Created: {new Date(faq.created_at).toLocaleString()}
                  <br />
                  Updated:{" "}
                  {faq.updated_at
                    ? new Date(faq.updated_at).toLocaleString()
                    : "—"}
                </p>
                <div className="flex gap-2 mt-2">
                  <Button onClick={() => handleEdit(faq)}>Edit</Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(faq.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
