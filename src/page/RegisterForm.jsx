import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CursorShadow from "../components/ui/CursorShadow";
import { useState } from "react";
import { supabase } from "../supabaseClient";
import { Link, useNavigate } from "react-router-dom";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    event: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        console.error("Auth error", authError);
        return;
      }

      // Now fetch from your 'users' table using user.id if needed
      const { data: userData, error } = await supabase
        .from("users") // your table where names are stored
        .select("name, email")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching user profile:", error);
        return;
      }

      // Pre-fill name and email
      setFormData((prev) => ({
        ...prev,
        name: userData.name || "",
        email: userData.email || "",
      }));
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit logic here
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Your Name"
        className="border p-2 w-full"
        readOnly
      />

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Your Email"
        className="border p-2 w-full"
        readOnly
      />

      <input
        type="text"
        name="event"
        value={formData.event}
        onChange={handleChange}
        placeholder="Event Name"
        className="border p-2 w-full"
      />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Register
      </button>
    </form>
  );
}

export default RegistrationForm;
