import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ViewMyEvents() {
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  // Step 1: Get auth user, then map to public.users
  useEffect(() => {
    const fetchUserId = async () => {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        console.error("Auth error:", authError?.message);
        return;
      }

      const { data: userData, error: userError } = await supabase
        .from("users") // your public.users table
        .select("id")
        .eq("email", user.email)
        .single();

      if (userError) {
        console.error("Error fetching from public.users:", userError.message);
        return;
      }

      setUserId(userData.id);
    };

    fetchUserId();
  }, []);

  // Step 2: Fetch registered events for the public user_id
  useEffect(() => {
    const fetchEvents = async () => {
      if (!userId) return;

      setLoading(true);

      const { data, error } = await supabase
        .from("registrations")
        .select("id, events(*)")
        .eq("user_id", userId);

      if (error) {
        console.error("Error fetching events:", error.message);
        setMyEvents([]);
      } else {
        setMyEvents(data);
      }

      setLoading(false);
    };

    fetchEvents();
  }, [userId]);


  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">My Registered Events</h1>

      {/* ✅ Add count summary here */}
      {!loading && myEvents.length > 0 && (
        <p className="mb-4 text-muted-foreground text-sm">
          You have registered for <span className="font-semibold text-primary">{myEvents.length}</span>{" "}
          event{myEvents.length !== 1 && "s"}.
        </p>
      )}

      {loading ? (
        <p>Loading your events...</p>
      ) : myEvents.length === 0 ? (
        <p>You haven’t registered for any events yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {myEvents.map(({ id, events }) => (
            <Card key={id}>
              <CardHeader>
                <CardTitle>{events.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={events.imageurl}
                  alt={events.title}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <p className="text-sm text-muted-foreground mb-1">{events.description}</p>
                <p className="text-sm font-semibold">Date: {events.date}</p>
                <p className="text-sm font-semibold">Time: {events.time}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
