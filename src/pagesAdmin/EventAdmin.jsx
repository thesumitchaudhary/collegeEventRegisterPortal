import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";

export default function EventAdmin() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    let imageUrl = null;

    // Upload image if selected
    if (imageFile) {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `event-images/${fileName}`;

      const { data, error: uploadError } = await supabase.storage
        .from("event-images")
        .upload(filePath, imageFile);

      if (uploadError) {
        console.log(uploadError);
        setMessage({ type: "error", text: "Image upload failed!" });
        setLoading(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("event-images")
        .getPublicUrl(filePath);

      imageUrl = publicUrlData.publicUrl;
    }

    const generateSlug = (title) => {
      return title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 -]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
    };

    const { error } = await supabase.from("events").insert([
      {
        ...formData,
        slug: generateSlug(formData.title),
        image: imageUrl,
      },
    ]);

    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      setMessage({ type: "success", text: "Event added successfully!" });
      setFormData({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
      });
      setImageFile(null);
    }

    setLoading(false);
  };

  return (
    <div className=" bg-black text-white">
      <header className="flex justify-between">
        <h1>CER</h1>
        <nav className="text-black flex gap-10">
          <Link to="/admin">Home</Link>
          <Link>Event</Link>
          <Link>blog</Link>
          <Link>resource</Link>
        </nav>
      </header>
      <main className="h-200 bg-black">
        <div className="max-w-xl mx-auto p-6 bg-[#d8d8d8]  text-black shadow rounded-xl">
          <h2 className="text-2xl font-bold mb-4 text-center">Add New Event</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              name="title"
              placeholder="Event Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <Textarea
              name="description"
              placeholder="Event Description"
              value={formData.description}
              onChange={handleChange}
              required
            />
            <Input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
            <Input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              name="location"
              placeholder="Event Location"
              value={formData.location}
              onChange={handleChange}
              required
            />
            <Input type="file" accept="image/*" onChange={handleImageChange} />
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Event"}
            </Button>
            {message && (
              <p
                className={`text-sm mt-2 ${
                  message.type === "error" ? "text-red-500" : "text-green-600"
                }`}
              >
                {message.text}
              </p>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}
