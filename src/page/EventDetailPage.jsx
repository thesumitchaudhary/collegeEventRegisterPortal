import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

function EventDetailPage() {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Fetch event data by slug
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

  if (!event) return <p>Loading...</p>;

  // Register user for event
 const register = async () => {
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (!user) {
    navigate("/signup");
    return;
  }

  console.log("User ID:", user.id); // should log 365cab25...
  console.log("Event ID:", event.id);

  const { error } = await supabase.from("registrations").insert({
    user_id: user.id,
    event_id: event.id,
    date: new Date().toISOString(), // only if required
  });

  if (error) {
    console.error("Registration error:", error);
    setMessage("Failed to register. Check console for details.");
  } else {
    setMessage("Successfully registered for the event!");
  }
};


  return (
    <div className="p-4 bg-black text-white min-h-screen">
      <h1 className="text-2xl font-bold">{event.title}</h1>
      <p className="mt-2">{event.description}</p>
      <p className="mt-2">Date: {event.date}</p>
      <p className="mt-1">Location: {event.location}</p>

      <div className="mt-4">
        <Button className="bg-white text-black" onClick={register}>
          Register
        </Button>
        {message && <p className="mt-2 text-sm">{message}</p>}
      </div>
    </div>
  );
}

export default EventDetailPage;