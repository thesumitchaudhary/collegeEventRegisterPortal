import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

// Importing image
import herossectionImage from "../images/herossection-image.avif";

export const ViewContactSubmissions = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("contactus") // ✅ Make sure your table name is exactly this
        .select("id, name, email, message, message_at, created_at")
        .order("created_at", { ascending: false });

      if (error) {
        console.log(error);
        // console.error("Error fetching messages:", error.message);
      } else {
        setMessages(data);
      }

      setLoading(false);
    };

    fetchMessages();
  }, []);

  if (loading) return <p className="text-center">Loading messages...</p>;

  if (messages.length === 0)
    return <p className="text-center">No messages found.</p>;

  return (
    <div className="relative w-full text-white min-h-screen overflow-hidden">
      <img
        src={herossectionImage}
        alt="hero section"
        className="absolute w-full h-full object-cover -z-[10]"
      />

      <div>
        <header className="flex justify-between p-4 text-white z-[10]">
          <h1 className="text-xl font-bold">CER</h1>
          <Link to="/admin">Home</Link>
        </header>

        <main className="z-[10]">
          <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Contact Messages
            </h2>
            <ul className="space-y-4">
              {messages.map((msg) => (
                <li key={msg.id} className="bg-white text-black shadow p-4 rounded border">
                  <p><strong>Name:</strong> {msg.name}</p>
                  <p><strong>Email:</strong> {msg.email}</p>
                  <p><strong>Message:</strong> {msg.message}</p>
                  <p><strong>Message At:</strong> {msg.message_at || "N/A"}</p>
                  <p className="text-sm text-gray-500">
                    <strong>Created At:</strong>{" "}
                    {new Date(msg.created_at).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};
