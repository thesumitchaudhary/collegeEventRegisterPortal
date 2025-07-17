import React from "react";
import {Link,useNavigate} from "react-router-dom";
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
      .from("feddback") 
      .select("*");

    if (error) {
      console.error("Error fetching data:", error);
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
        className="absolute  w-full h-full object-cover -z-[10]"
      />
      <div>
         <header className="flex justify-between p-4  text-white z-[10]">
          <h1 className="text-xl font-bold">CER</h1>
            <Link to="/admin">Home</Link>
        </header>
        <main>
              <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Fetched Data</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-2">
          {data.map((item) => (
            <li key={item.id} className="p-4 border rounded">
              <p><strong>ID:</strong> {item.id}</p>
              <p><strong>Name:</strong> {item.name}</p>
              <p><strong>Email:</strong> {item.email}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
        </main>
      </div>
    </div>
  );
};
