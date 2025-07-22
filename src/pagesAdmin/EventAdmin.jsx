import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";

// Importing image
import herossectionImage from "../images/herossection-image.avif";

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
    <div className="relative w-full text-white min-h-screen overflow-hidden">
      <img
        src={herossectionImage}
        alt="hero section"
        className="absolute  w-full h-full object-cover -z-[10]"
      />
      <header className="max-w-[50rem] mx-auto px-8 py-10  z-10 relative">
        <h1 className="text-6xl font-semibold mb-6">
          Welcome to College Event Manage Page
        </h1>
        <Link to="/admin">Home</Link>
      </header>
      <div className="text-white ">
        <main className="h-200 z-[10]">
          <div className="max-w-xl mx-auto p-6 bg-[#05101c]   text-white shadow rounded-xl">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Add New Event
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4 bg-[#05101c] ">
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
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
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
    </div>
  );
}
