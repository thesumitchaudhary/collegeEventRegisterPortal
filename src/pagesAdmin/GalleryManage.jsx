import { useState } from "react";
import {Link, useNavigate} from "react-router"
import { supabase } from "../supabaseClient";

// Importing image
import herossectionImage from "../images/herossection-image.avif";

export default function GalleryManage() {
  const [imageFile, setImageFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleImageUpload = async () => {
    setUploading(true);
    setMessage("");

    if (!imageFile || !title) {
      setMessage("Image and Title are required.");
      setUploading(false);
      return;
    }

    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `gallery/${fileName}`;

    // 1. Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(filePath, imageFile);

    if (uploadError) {
      setMessage("Upload failed: " + uploadError.message);
      setUploading(false);
      return;
    }

    // 2. Get public URL
    const { data: imageURL } = supabase.storage
      .from("gallery")
      .getPublicUrl(filePath);

    // 3. Insert record into gallery table
    const { error: insertError } = await supabase.from("gallery").insert({
      title,
      description,
      imageurls: imageURL.publicUrl,
    });

    if (insertError) {
      setMessage("Database insert failed: " + insertError.message);
    } else {
      setMessage("Image uploaded successfully!");
      setTitle("");
      setDescription("");
      setImageFile(null);
    }

    setUploading(false);
  };

  return (
    <div className="relative w-full text-white min-h-screen overflow-hidden">
      <img
        src={herossectionImage}
        alt="hero section"
        className="absolute  w-full h-full object-cover -z-[10]"
      />

      <header className="flex justify-between p-4  text-white z-[10]">
        <h1 className="text-xl font-bold">CER</h1>
        <Link to="/admin">Home</Link>
      </header>

      <main className="p-6  max-w-4xl mx-auto space-y-6 z-[10]">
        <h2 className="text-xl font-semibold mb-4">Upload Image</h2>

        <input
          type="text"
          placeholder="Image Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />

        <textarea
          placeholder="Image Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        ></textarea>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="mb-2"
        />

        <button
          onClick={handleImageUpload}
          disabled={uploading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>

        {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
      </main>
    </div>
  );
}
