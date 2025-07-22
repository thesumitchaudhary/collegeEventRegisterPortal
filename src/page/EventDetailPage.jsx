import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Button } from "../components/ui/button";

function EventDetailPage() {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [message, setMessage] = useState("");
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const navigate = useNavigate();

  // ✅ Fetch event by slug
  useEffect(() => {
    const fetchEvent = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) {
        console.error("Error fetching event:", error.message);
      } else {
        setEvent(data);
      }
    };

    fetchEvent();
  }, [slug]);

  // ✅ Check if user is already registered for this event
  useEffect(() => {
    const checkRegistration = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user || !event) return;

      const { data: existing, error } = await supabase
        .from("registrations")
        .select("*")
        .eq("user_id", user.id)
        .eq("event_id", event.id)
        .maybeSingle();

      if (existing) {
        setAlreadyRegistered(true);
        setMessage("You are already registered for this event!");
      }
    };

    checkRegistration();
  }, [event]);

  // ✅ Handle Registration
  const register = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/signup");
      return;
    }

    // Check again before inserting (optional extra safety)
    const { data: existing, error: existingError } = await supabase
      .from("registrations")
      .select("*")
      .eq("user_id", user.id)
      .eq("event_id", event.id)
      .maybeSingle();

    if (existing) {
      setAlreadyRegistered(true);
      setMessage("You are already registered for this event!");
      return;
    }

    // Insert new registration
    const { error: insertError } = await supabase.from("registrations").insert([
      {
        user_id: user.id,
        event_id: event.id,
        date: new Date().toISOString(),
      },
    ]);

    if (insertError) {
      console.error("Registration error:", insertError.message);
      setMessage("Failed to register. Try again.");
    } else {
      setAlreadyRegistered(true);
      setMessage("Successfully registered!");
    }
  };

  if (!event) return <p className="p-4 text-white">Loading...</p>;

  return (
    <div className="p-4 bg-black text-white min-h-screen">
      <h1 className="text-2xl font-bold">{event.title}</h1>
      <p className="mt-2">{event.description}</p>
      <p className="mt-2">Date: {event.date}</p>
      <p className="mt-1">Location: {event.location}</p>

      <div className="mt-4">
        <Button
          className="bg-white text-black"
          onClick={register}
          disabled={alreadyRegistered}
        >
          {alreadyRegistered ? "Already Registered" : "Register"}
        </Button>

        {message && <p className="mt-2 text-sm">{message}</p>}
      </div>
    </div>
  );
}

export default EventDetailPage;
