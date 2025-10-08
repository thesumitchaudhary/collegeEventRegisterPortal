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
        <h1 className="text-6xl font-semibold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
          Welcome to College Gallery Manage Page
        </h1>
        <Link 
          to="/admin" 
          className="inline-block bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          🏠 Home
        </Link>
      </header>

      <main className="p-6 max-w-6xl mx-auto space-y-8 z-[10]">
        {/* Upload Section */}
        <section className="bg-gradient-to-br from-slate-800 via-purple-900 to-slate-900 border-purple-500/20 shadow-2xl rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-red-500 to-yellow-500 bg-clip-text text-transparent">
            📸 Upload Image
          </h2>

          <div className="space-y-6">
            <input
              type="text"
              placeholder="🎯 Image Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-4 text-white bg-slate-700/50 border-purple-400/30 focus:border-purple-400 focus:ring-purple-400/20 placeholder:text-gray-300 rounded-lg transition-all duration-300"
            />

            <textarea
              placeholder="📝 Image Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-4 text-white bg-slate-700/50 border-purple-400/30 focus:border-purple-400 focus:ring-purple-400/20 placeholder:text-gray-300 rounded-lg min-h-[100px] resize-none transition-all duration-300"
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full text-white bg-slate-700/50 border-purple-400/30 focus:border-purple-400 focus:ring-purple-400/20 rounded-lg p-4 file:bg-purple-600 file:text-white file:border-0 file:rounded-md file:px-4 file:py-2 file:mr-4 transition-all duration-300"
            />

            <button
              onClick={handleImageUpload}
              disabled={uploading}
              className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white border-0 transform transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed py-4 px-6 rounded-lg font-semibold"
            >
              {uploading ? "⏳ Uploading..." : "📤 Upload Image"}
            </button>

            {message && (
              <div className={`p-4 rounded-lg border ${
                message.includes('successfully') || message.includes('deleted') 
                  ? 'bg-green-500/10 border-green-500/30 text-green-300' 
                  : message.includes('failed') || message.includes('required')
                  ? 'bg-red-500/10 border-red-500/30 text-red-300'
                  : 'bg-blue-500/10 border-blue-500/30 text-blue-300'
              }`}>
                <p className="text-sm font-medium flex items-center gap-2">
                  {message.includes('successfully') || message.includes('deleted') ? '✅' : 
                   message.includes('failed') || message.includes('required') ? '❌' : 'ℹ️'}
                  {message}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Gallery Section */}
        <section>
          <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-emerald-400 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
            🖼️ Gallery Images
          </h2>
          {images.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-300 text-lg bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-8 inline-block">
                🖼️ No images found. Upload your first image above!
              </p>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {images.map((img) => (
              <div
                key={img.id}
                className="bg-gradient-to-br from-slate-800 via-indigo-900 to-slate-900 border-indigo-500/20 shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 p-6 rounded-xl hover:scale-105 group"
              >
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img
                    src={img.imageurls}
                    alt={img.title}
                    className="w-full h-48 object-cover transition-all duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <h3 className="text-lg font-bold mb-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  {img.title}
                </h3>
                <p className="text-gray-200 text-sm mb-4 leading-relaxed line-clamp-3">
                  {img.description}
                </p>
                
                <div className="flex gap-3 pt-4 border-t border-gray-600/30">
                  <button
                    onClick={() => handleDelete(img.id, img.imageurls)}
                    className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white border-0 transform transition-all duration-300 hover:scale-105 hover:shadow-lg px-3 py-2 rounded-lg text-sm font-semibold"
                  >
                    🗑️ Delete
                  </button>
                  <button
                    onClick={() =>
                      handleUpdate(img.id, img.title, img.description)
                    }
                    className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0 transform transition-all duration-300 hover:scale-105 hover:shadow-lg px-3 py-2 rounded-lg text-sm font-semibold"
                  >
                    ✏️ Edit
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
