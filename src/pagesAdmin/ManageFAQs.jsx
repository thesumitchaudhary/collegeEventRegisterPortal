import React, { useEffect, useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient"; // ✅ Fixed path

import herossectionImage from "../images/herossection-image.avif";

export default function ManageFAQs() {
  const [faqs, setFaqs] = useState([]);
  const [formData, setFormData] = useState({ question: "", answer: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    const { data, error } = await supabase
      .from("faqs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to fetch FAQs:", error.message);
    } else {
      setFaqs(data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form:", formData); // ✅ Debug

    const timestamp = new Date().toISOString();

    if (editingId) {
      const { error } = await supabase
        .from("faqs")
        .update({
          ...formData,
          updated_at: timestamp,
        })
        .eq("id", editingId);

      if (error) {
        console.error("Failed to update FAQ:", error.message);
      } else {
        console.log("FAQ updated successfully");
      }
    } else {
      const { error } = await supabase.from("faqs").insert([
        {
          ...formData,
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

  const handleEdit = (faq) => {
    setFormData({ question: faq.question, answer: faq.answer });
    setEditingId(faq.id);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("faqs").delete().eq("id", id);
    if (error) {
      console.error("Failed to delete FAQ:", error.message);
    } else {
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
      <header className="flex justify-between p-4 text-white z-[10]">
        <h1 className="text-xl font-bold">CER</h1>
        <Link to="/admin" className="hover:underline">Home</Link>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8 z-[10]">
        <h2 className="text-2xl font-bold mb-4">Admin: Manage FAQs</h2>

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
          <Button type="submit">{editingId ? "Update FAQ" : "Add FAQ"}</Button>
        </form>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="border bg-white text-black p-4 rounded shadow-sm">
              <h3 className="font-semibold">{faq.question}</h3>
              <p className="text-gray-700">{faq.answer}</p>
              <p className="text-sm text-gray-500 mt-1">
                Created: {new Date(faq.created_at).toLocaleString()}<br />
                Updated: {faq.updated_at ? new Date(faq.updated_at).toLocaleString() : "—"}
              </p>
              <div className="flex gap-2 mt-2">
                <Button onClick={() => handleEdit(faq)}>Edit</Button>
                <Button variant="destructive" onClick={() => handleDelete(faq.id)}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
