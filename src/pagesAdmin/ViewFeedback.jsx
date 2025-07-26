import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

// Importing image
import herossectionImage from "../images/herossection-image.avif";

export const ViewFeedback = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);

    const { data, error } = await supabase
      .from("feedback") // ✅ Make sure your table name is correct
      .select("*");

    if (error) {
      console.log(error);
      // console.error("Error fetching data:", error.message);
    } else {
      setData(data);
    }

    setLoading(false);
  }

  return (
    <div className="relative w-full text-white min-h-screen overflow-hidden">
      <img
        src={herossectionImage}
        alt="hero section"
        className="absolute w-full h-full object-cover -z-[10]"
      />
      <div>
        <header className="max-w-[50rem] mx-auto px-8 py-10 z-10 relative">
          <h1 className="text-6xl font-semibold mb-6">
            Welcome to College Feedback Manage Page
          </h1>
          <Link to="/admin">Home</Link>
        </header>
        <main>
          <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Fetched Feedback</h1>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <ul className="space-y-2">
                {data.length > 0 ? (
                  data.map((item) => (
                    <li
                      key={item.id}
                      className="p-4 border rounded bg-white text-black"
                    >
                      <p>
                        <strong>ID:</strong> {item.id}
                      </p>
                      <p>
                        <strong>Name:</strong> {item.name || "N/A"}
                      </p>
                      <p>
                        <strong>Email:</strong> {item.email || "N/A"}
                      </p>
                      <p>
                        <strong>Feedback:</strong> {item.message || "N/A"}
                      </p>
                    </li>
                  ))
                ) : (
                  <p>No feedback found.</p>
                )}
              </ul>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
