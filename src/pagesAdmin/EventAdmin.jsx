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
        <h1 className="text-6xl font-semibold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">Welcome to College Event Manage Page</h1>
        <Link 
          to="/admin" 
          className="inline-block bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          🏠 Home
        </Link>
      </header>

      <main className="text-white z-[10] p-6 max-w-6xl mx-auto space-y-8">
        <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-slate-800 via-purple-900 to-slate-900 border-purple-500/20 shadow-2xl rounded-xl">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-pink-400 via-red-500 to-yellow-500 bg-clip-text text-transparent">
            {editingId ? "✏️ Edit Event" : "📅 Add New Event"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input 
              type="text" 
              name="title" 
              placeholder="🎯 Event Title" 
              value={formData.title} 
              onChange={handleChange} 
              required 
              className="text-white bg-slate-700/50 border-purple-400/30 focus:border-purple-400 focus:ring-purple-400/20 placeholder:text-gray-300"
            />
            <Textarea 
              name="description" 
              placeholder="📝 Event Description" 
              value={formData.description} 
              onChange={handleChange} 
              required 
              className="text-white bg-slate-700/50 border-purple-400/30 focus:border-purple-400 focus:ring-purple-400/20 placeholder:text-gray-300 min-h-[100px]"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                type="date" 
                name="date" 
                value={formData.date} 
                onChange={handleChange} 
                required 
                className="text-white bg-slate-700/50 border-purple-400/30 focus:border-purple-400 focus:ring-purple-400/20"
              />
              <Input 
                type="time" 
                name="time" 
                value={formData.time} 
                onChange={handleChange} 
                required 
                className="text-white bg-slate-700/50 border-purple-400/30 focus:border-purple-400 focus:ring-purple-400/20"
              />
            </div>
            <Input 
              type="text" 
              name="location" 
              placeholder="📍 Event Location" 
              value={formData.location} 
              onChange={handleChange} 
              required 
              className="text-white bg-slate-700/50 border-purple-400/30 focus:border-purple-400 focus:ring-purple-400/20 placeholder:text-gray-300"
            />
            <Input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
              className="text-white bg-slate-700/50 border-purple-400/30 focus:border-purple-400 focus:ring-purple-400/20 file:bg-purple-600 file:text-white file:border-0 file:rounded-md file:px-4 file:py-2 file:mr-4"
            />
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white border-0 transform transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed py-3"
            >
              {loading 
                ? (editingId ? "⏳ Updating..." : "⏳ Saving...") 
                : (editingId ? "✏️ Update Event" : "📤 Add Event")
              }
            </Button>
            {message && (
              <div className={`p-4 rounded-lg border ${
                message.type === "error" 
                  ? 'bg-red-500/10 border-red-500/30 text-red-300' 
                  : 'bg-green-500/10 border-green-500/30 text-green-300'
              }`}>
                <p className="text-sm font-medium flex items-center gap-2">
                  {message.type === "error" ? '❌' : '✅'}
                  {message.text}
                </p>
              </div>
            )}
          </form>
        </div>

        <div className="w-full">
          <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-emerald-400 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
            🎪 All Events
          </h2>
          {events.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-300 text-lg bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-8 inline-block">
                📅 No events found. Create your first event above!
              </p>
            </div>
          )}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div key={event.id} className="bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 border-blue-500/20 shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 p-6 rounded-xl hover:scale-105">
                {event.image && (
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full max-h-48 object-cover mb-4 rounded-lg border-2 border-blue-500/20" 
                  />
                )}
                <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {event.title}
                </h3>
                <p className="text-gray-200 text-sm mb-4 leading-relaxed">
                  {event.description}
                </p>
                <div className="space-y-2 mb-4">
                  <p className="text-cyan-300 text-sm flex items-center gap-2">
                    🗓️ {event.date} at {event.time}
                  </p>
                  <p className="text-emerald-300 text-sm flex items-center gap-2">
                    📍 {event.location}
                  </p>
                </div>
                <div className="flex gap-3 pt-4 border-t border-gray-600/30">
                  <Button 
                    size="sm" 
                    onClick={() => handleEdit(event)}
                    className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    ✏️ Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive" 
                    onClick={() => handleDelete(event.id)}
                    className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white border-0 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    🗑️ Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
