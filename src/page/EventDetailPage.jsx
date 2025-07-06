import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient"; // your Supabase client
import { Button } from "../components/ui/button";


function EventDetailPage() {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [message, setMessage] = useState("");

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

  const register = async () => {
    // Get currently logged-in user
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setMessage("You must be logged in to register.");
      return;
    }

    const { error } = await supabase.from("registrations").insert({
      user_id: user.id,
      event_id: event.id
    });

    if (error) {
        // console.log(error);
      console.error("Registration error:", error);
      setMessage("Failed to register. You might already be registered.");
    } else {
      setMessage("Successfully registered for the event!");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{event.title}</h1>
      <p>{event.description}</p>
      <p>Date: {event.date}</p>
      <p>Location: {event.location}</p>
      <div>
        <Button onClick={register}>click me</Button>
      </div>
    </div>
  );
}

export default EventDetailPage;
