import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import herossectionImage from "../images/herossection-image.avif";

export const ManageEventSchedule = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [location, setLocation] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);

  const navigate = useNavigate();

  // Fetch all events
  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    const { data, error } = await supabase
      .from("eventschedule")
      .select("*")
      .order("event_date", { ascending: true });
    if (!error) setEvents(data);
  }

  async function uploadImageAndInsert(e) {
    e.preventDefault();

    let imageUrl = null;
    if (imageFile) {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `events/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("eventscheduleimages")
        .upload(filePath, imageFile);

      if (uploadError) {
        setMessage("❌ Image upload failed.");
        return;
      }

      const { data: imageData } = supabase.storage
        .from("eventscheduleimages")
        .getPublicUrl(filePath);

      imageUrl = imageData.publicUrl;
    }

    if (editingId) {
      // Update existing event
      const { error: updateError } = await supabase
        .from("eventschedule")
        .update({
          title,
          description,
          event_date: eventDate,
          event_time: eventTime,
          location,
          ...(imageUrl && { imagesurl: imageUrl }),
        })
        .eq("id", editingId);

      if (updateError) {
        console.log(updateError);
        setMessage("❌ Failed to update event.");
      } else {
        setMessage("✅ Event updated successfully!");
        resetForm();
        fetchEvents();
      }
    } else {
      // Insert new event
      const { error: insertError } = await supabase
        .from("eventschedule")
        .insert([
          {
            title,
            description,
            event_date: eventDate,
            event_time: eventTime,
            location,
            imagesurl: imageUrl,
          },
        ]);

      if (insertError) {
        console.log(insertError);
        setMessage("❌ Failed to insert event.");
      } else {
        setMessage("✅ Event added successfully!");
        resetForm();
        fetchEvents();
      }
    }
  }

  function resetForm() {
    setTitle("");
    setDescription("");
    setEventDate("");
    setEventTime("");
    setLocation("");
    setImageFile(null);
    setEditingId(null);
  }

  function startEdit(event) {
    setEditingId(event.id);
    setTitle(event.title);
    setDescription(event.description);
    setEventDate(event.event_date);
    setEventTime(event.event_time);
    setLocation(event.location);
    setImageFile(null);
    setMessage("📝 Editing mode");
  }

  async function deleteEvent(id) {
    const { error } = await supabase
      .from("eventschedule")
      .delete()
      .eq("id", id);
    if (!error) {
      setMessage("🗑️ Event deleted.");
      fetchEvents();
    }
  }

  return (
    <div className="relative w-full text-white min-h-screen overflow-hidden">
      <img
        src={herossectionImage}
        alt="hero section"
        className="absolute w-full h-full object-cover -z-[10]"
      />

      <header className="max-w-[50rem] mx-auto px-8 py-10 z-10 relative">
        <h1 className="text-6xl font-semibold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
          Welcome to College Event Schedule Manage Page
        </h1>
        <Link 
          to="/admin" 
          className="inline-block bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          🏠 Home
        </Link>
      </header>

      <main className="p-6 max-w-6xl mx-auto space-y-8 z-[10]">
        <div className="bg-gradient-to-br from-slate-800 via-purple-900 to-slate-900 border-purple-500/20 shadow-2xl rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-red-500 to-yellow-500 bg-clip-text text-transparent">
            📅 Manage Event Schedule
          </h2>

          <form onSubmit={uploadImageAndInsert} className="space-y-6">
            <Input
              type="text"
              placeholder="🎯 Event Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="text-white bg-slate-700/50 border-purple-400/30 focus:border-purple-400 focus:ring-purple-400/20 placeholder:text-gray-300"
            />
            <Textarea
              placeholder="📝 Event Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="text-white bg-slate-700/50 border-purple-400/30 focus:border-purple-400 focus:ring-purple-400/20 placeholder:text-gray-300 resize-none"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                required
                className="text-white bg-slate-700/50 border-purple-400/30 focus:border-purple-400 focus:ring-purple-400/20"
              />
              <Input
                type="time"
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
                required
                className="text-white bg-slate-700/50 border-purple-400/30 focus:border-purple-400 focus:ring-purple-400/20"
              />
            </div>
            <Input
              type="text"
              placeholder="📍 Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="text-white bg-slate-700/50 border-purple-400/30 focus:border-purple-400 focus:ring-purple-400/20 placeholder:text-gray-300"
            />
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="text-white bg-slate-700/50 border-purple-400/30 focus:border-purple-400 focus:ring-purple-400/20 file:bg-purple-600 file:text-white file:border-0 file:rounded-md file:px-4 file:py-2 file:mr-4"
            />
            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white border-0 transform transition-all duration-300 hover:scale-105 hover:shadow-lg py-3"
            >
              {editingId ? "✏️ Update Event" : "📤 Add Event"}
            </Button>
          </form>

          {message && (
            <div className={`mt-6 p-4 rounded-lg border ${
              message.includes('successfully') || message.includes('deleted') 
                ? 'bg-green-500/10 border-green-500/30 text-green-300' 
                : message.includes('failed') || message.includes('Failed')
                ? 'bg-red-500/10 border-red-500/30 text-red-300'
                : 'bg-blue-500/10 border-blue-500/30 text-blue-300'
            }`}>
              <p className="text-sm font-medium text-center">
                {message}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <h3 className="text-4xl font-bold text-center bg-gradient-to-r from-emerald-400 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
            📋 All Scheduled Events
          </h3>
          {events.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-300 text-lg bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-8 inline-block">
                📅 No events scheduled yet. Add your first event above!
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {events.map((event) => (
                <div key={event.id} className="bg-gradient-to-br from-slate-800 via-indigo-900 to-slate-900 border-indigo-500/20 shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 p-6 rounded-xl hover:scale-[1.02] group">
                  <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
                    <div className="flex-1 space-y-4">
                      <h4 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        {event.title}
                      </h4>
                      <p className="text-gray-200 leading-relaxed">
                        {event.description}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <p className="text-cyan-300 flex items-center gap-2">
                          🗓️ {event.event_date}
                        </p>
                        <p className="text-emerald-300 flex items-center gap-2">
                          ⏰ {event.event_time}
                        </p>
                        <p className="text-yellow-300 flex items-center gap-2 md:col-span-2">
                          📍 {event.location}
                        </p>
                      </div>
                      {event.imagesurl && (
                        <div className="mt-4">
                          <img
                            src={event.imagesurl}
                            alt="Event"
                            className="w-48 h-32 object-cover rounded-lg border-2 border-indigo-500/20 group-hover:border-indigo-400/40 transition-all duration-300"
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-3 min-w-[120px]">
                      <Button
                        onClick={() => startEdit(event)}
                        variant="secondary"
                        className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      >
                        ✏️ Edit
                      </Button>
                      <Button
                        onClick={() => deleteEvent(event.id)}
                        variant="destructive"
                        className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white border-0 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
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
      </main>
    </div>
  );
};
