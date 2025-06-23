import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CursorShadow from "../components/ui/CursorShadow";
import { useState } from "react";
import { supabase } from "@/supabaseClient"; // adjust the path if needed
import { Link, useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [form, setForm] = useState({ name: "", email: "", event: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("registrations") // use your correct table name
      .insert([form]);

    if (error) {
      setMessage(`❌ Error: ${error.message}`);
    } else {
      setMessage("✅ Registered successfully!");
      setForm({ name: "", email: "", event: "" });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-md rounded-xl border space-y-4">
      <CursorShadow />
      <h2 className="text-xl font-semibold">Register for Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
        <Input name="email" placeholder="Email Address" value={form.email} onChange={handleChange} required />
        <Input name="event" placeholder="Event Name" value={form.event} onChange={handleChange} required />
        <Button type="submit">Submit</Button>
      </form>
      {message && <p className="text-sm text-center text-blue-600">{message}</p>}
      <Link to="/" className="text-black   text-lg  no-underline">
          Home
      </Link>
    </div>
  );
}
