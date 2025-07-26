import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
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
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data, error } = await supabase.from("events").select("*").order("date", { ascending: true });
    if (!error) setEvents(data);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    let imageUrl = null;

    if (imageFile) {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `event-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("event-images")
        .upload(filePath, imageFile);

      if (uploadError) {
        setMessage({ type: "error", text: "Image upload failed!" });
        setLoading(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("event-images")
        .getPublicUrl(filePath);

      imageUrl = publicUrlData.publicUrl;
    }

    const eventData = {
      ...formData,
      slug: generateSlug(formData.title),
      ...(imageUrl && { image: imageUrl }),
    };

    let result;
    if (editingId) {
      result = await supabase.from("events").update(eventData).eq("id", editingId);
    } else {
      result = await supabase.from("events").insert([eventData]);
    }

    if (result.error) {
      setMessage({ type: "error", text: result.error.message });
    } else {
      setMessage({
        type: "success",
        text: editingId ? "Event updated!" : "Event added!",
      });
      setFormData({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
      });
      setImageFile(null);
      setEditingId(null);
      fetchEvents();
    }

    setLoading(false);
  };

  const handleEdit = (event) => {
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
    });
    setEditingId(event.id);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (!error) {
      setMessage({ type: "success", text: "Event deleted!" });
      fetchEvents();
    } else {
      setMessage({ type: "error", text: error.message });
    }
  };

  return (
    <div className="relative w-full text-white min-h-screen overflow-hidden">
      <img src={herossectionImage} alt="hero section" className="absolute w-full h-full object-cover -z-[10]" />
      <header className="max-w-[50rem] mx-auto px-8 py-10 z-10 relative">
        <h1 className="text-6xl font-semibold mb-6">Welcome to College Event Manage Page</h1>
        <Link to="/admin">Home</Link>
      </header>

      <main className="text-white z-[10]">
        <div className="max-w-xl mx-auto p-6 bg-[#05101c] text-white shadow rounded-xl">
          <h2 className="text-2xl font-bold mb-4 text-center">
            {editingId ? "Edit Event" : "Add New Event"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input type="text" name="title" placeholder="Event Title" value={formData.title} onChange={handleChange} required />
            <Textarea name="description" placeholder="Event Description" value={formData.description} onChange={handleChange} required />
            <Input type="date" name="date" value={formData.date} onChange={handleChange} required />
            <Input type="time" name="time" value={formData.time} onChange={handleChange} required />
            <Input type="text" name="location" placeholder="Event Location" value={formData.location} onChange={handleChange} required />
            <Input type="file" accept="image/*" onChange={handleImageChange} />
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : editingId ? "Update Event" : "Add Event"}
            </Button>
            {message && (
              <p className={`text-sm mt-2 ${message.type === "error" ? "text-red-500" : "text-green-600"}`}>
                {message.text}
              </p>
            )}
          </form>
        </div>

        <div className="max-w-4xl mx-auto mt-10 px-4">
          <h2 className="text-3xl font-bold mb-6 text-white">All Events</h2>
          {events.length === 0 && <p>No events found.</p>}
          <div className="grid md:grid-cols-2 gap-6">
            {events.map((event) => (
              <div key={event.id} className="bg-[#0b1a2d] p-4 rounded-lg shadow">
                {event.image && (
                  <img src={event.image} alt={event.title} className="w-full max-h-60 object-cover mb-2 rounded" />
                )}
                <h3 className="text-xl font-bold">{event.title}</h3>
                <p className="text-sm">{event.description}</p>
                <p className="text-xs mt-1">{event.date} at {event.time}</p>
                <p className="text-xs mb-2">Location: {event.location}</p>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleEdit(event)}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(event.id)}>Delete</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
