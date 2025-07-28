import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

// Importing background image
import herossectionImage from "../images/herossection-image.avif";

export default function GalleryManage() {
  const [imageFile, setImageFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("created-at", { ascending: false });

    if (!error) setImages(data);
  };

  useEffect(() => {
    fetchImages();
  }, []);

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

    const { error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(filePath, imageFile);

    if (uploadError) {
      setMessage("Upload failed: " + uploadError.message);
      setUploading(false);
      return;
    }

    const { data: imageURL } = supabase.storage
      .from("gallery")
      .getPublicUrl(filePath);

    const { error: insertError } = await supabase.from("gallery").insert({
      title,
      description,
      imageurls: imageURL.publicUrl,
    });

    if (insertError) {
      setMessage("Database insert failed: " + insertError.message);
    } else {
      setMessage("Image inserted successfully!");
      setTitle("");
      setDescription("");
      setImageFile(null);
      fetchImages();
    }

    setUploading(false);
  };

  const handleDelete = async (id, imageUrl) => {
    const path = imageUrl.split("/storage/v1/object/public/gallery/")[1];

    const { error: storageError } = await supabase.storage
      .from("gallery")
      .remove([path]);

    if (storageError) {
      alert("Storage delete failed");
      return;
    }

    const { error: dbError } = await supabase
      .from("gallery")
      .delete()
      .eq("id", id);

    if (!dbError) {
      setMessage("Image deleted.");
      fetchImages();
    }
  };

  const handleUpdate = async (id, oldTitle, oldDesc) => {
    const newTitle = prompt("New title:", oldTitle);
    const newDesc = prompt("New description:", oldDesc);

    if (!newTitle) return;

    const { error } = await supabase
      .from("gallery")
      .update({ title: newTitle, description: newDesc })
      .eq("id", id);

    if (!error) {
      setMessage("Updated successfully.");
      fetchImages();
    }
  };

  return (
    <div className="relative w-full text-white min-h-screen overflow-auto">
      <img
        src={herossectionImage}
        alt="hero section"
        className="absolute w-full h-full object-cover -z-[10]"
      />

      <header className="max-w-[50rem] mx-auto px-8 py-10 z-10 relative">
        <h1 className="text-6xl font-semibold mb-6">
          Welcome to College Gallery Manage Page
        </h1>
        <Link to="/admin">Home</Link>
      </header>

      <main className="p-6 max-w-5xl mx-auto space-y-8 z-[10]">
        {/* Upload Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Upload Image</h2>

          <input
            type="text"
            placeholder="Image Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded mb-2 text-white"
          />

          <textarea
            placeholder="Image Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded mb-2 text-white"
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

          {message && <p className="mt-2 text-sm text-green-300">{message}</p>}
        </section>

        {/* Gallery Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Gallery Images</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {images.map((img) => (
              <div
                key={img.id}
                className="bg-white/20 backdrop-blur p-4 rounded shadow"
              >
                <img
                  src={img.imageurls}
                  alt={img.title}
                  className="w-full h-48 object-cover rounded"
                />
                <h3 className="text-lg font-bold mt-2">{img.title}</h3>
                <p className="text-sm mb-2">{img.description}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDelete(img.id, img.imageurls)}
                    className="bg-red-600 px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() =>
                      handleUpdate(img.id, img.title, img.description)
                    }
                    className="bg-yellow-500 px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
