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

  console.log(message);

  // Fetch event by slug
  useEffect(() => {
    const fetchEvent = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) {
        console.error("Error fetching event:", error);
      } else {
        setEvent(data);
      }
    };

    fetchEvent();
  }, [slug]);

  // Check registration status
  useEffect(() => {
    const checkRegistration = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !event) return;

      const { data: existing, error } = await supabase
        .from("registrations")
        .select("*")
        .eq("user_id", user.id)
        .eq("event_id", event.id)
        .single();

      if (existing) {
        setAlreadyRegistered(true);
      }
    };

    checkRegistration();
  }, [event]);

  if (!event) return <p>Loading...</p>;

  // Register user
  const register = async () => {
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (!user) {
      navigate("/signup"); // redirect directly
      return;
    }

 // Check if already registered
  const { data: existing, error: existingError } = await supabase
    .from("registrations")
    .select("*")
    .eq("user_id", user.id)
    .eq("event_id", event.id)
    .maybeSingle(); // use maybeSingle to avoid throw if no match

  if (existing) {
    setMessage("You are already registered for this event!");
    return;
  }

  // Register new
  const { error } = await supabase.from("registrations").insert({
    user_id: user.id,
    event_id: event.id,
    date: new Date().toISOString(),
  });

  if (error) {
    console.error("Registration error:", error);
    setMessage("Failed to register. Try again.");
  } else {
    setMessage("Successfully registered!");
  }
};

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
