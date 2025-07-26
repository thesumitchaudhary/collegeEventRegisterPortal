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
        <h1 className="text-6xl font-semibold mb-6">
          Welcome to College Event Schedule Manage Page
        </h1>
        <Link to="/admin">Home</Link>
      </header>

      <main className="p-6 max-w-4xl mx-auto space-y-6 z-[10]">
        <h2 className="text-2xl font-bold">Manage Event Schedule</h2>

        <form onSubmit={uploadImageAndInsert} className="grid gap-4">
          <Input
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Textarea
            placeholder="Event Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
          <Input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            required
          />
          <Input
            type="time"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          <Button type="submit">
            {editingId ? "Update Event" : "Add Event"}
          </Button>
        </form>

        {message && <p className="mt-4 text-sm text-center">{message}</p>}

        <hr className="my-6 border-white/30" />

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">All Scheduled Events</h3>
          {events.length === 0 ? (
            <p className="text-sm text-white/60">No events added yet.</p>
          ) : (
            <ul className="grid gap-4">
              {events.map((event) => (
                <li key={event.id} className="bg-white/10 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-bold">{event.title}</h4>
                      <p className="text-sm">{event.description}</p>
                      <p className="text-sm italic">
                        {event.event_date} at {event.event_time}
                      </p>
                      <p className="text-sm">{event.location}</p>
                      {event.imagesurl && (
                        <img
                          src={event.imagesurl}
                          alt="Event"
                          className="mt-2 w-32 rounded"
                        />
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => startEdit(event)}
                        variant="secondary"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => deleteEvent(event.id)}
                        variant="destructive"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
};
