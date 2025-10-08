import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import herossectionImage from "../images/herossection-image.avif";

export const ManageFeaturesSection = () => {
  const [features, setFeatures] = useState([]);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    key: "",
    title: "",
    description: "",
    icon: "",
    image_url: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const fetchFeatures = async () => {
    const { data, error } = await supabase.from("features").select("*");
    if (error) {
      setMessage("Failed to fetch features");
      console.error("Fetch error:", error);
    } else {
      setFeatures(data);
    }
  };

  useEffect(() => {
    fetchFeatures();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const uploadImage = async () => {
    if (!imageFile) return formData.image_url;

    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${formData.key}-${Date.now()}.${fileExt}`;
    const filePath = `features/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("features-images")
      .upload(filePath, imageFile);

    if (uploadError) {
      setMessage("Image upload failed");
      console.error("Image upload failed:", uploadError);
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from("features-images")
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Uploading image...");

    const uploadedUrl = await uploadImage();
    if (!uploadedUrl) {
      setMessage("Image upload failed. Submission aborted.");
      return;
    }

    const dataToSubmit = { ...formData, image_url: uploadedUrl };

    if (editingId) {
      const { error } = await supabase
        .from("features")
        .update(dataToSubmit)
        .eq("id", editingId);

      if (error) {
        setMessage("Feature update failed.");
        console.error(error);
      } else {
        setMessage("Feature updated successfully.");
        setEditingId(null);
        setFormData({ key: "", title: "", description: "", icon: "", image_url: "" });
        setImageFile(null);
        fetchFeatures();
      }
    } else {
      const { error } = await supabase.from("features").insert([dataToSubmit]);
      if (error) {
        setMessage("Feature insert failed.");
        console.error(error);
      } else {
        setMessage("Feature added successfully.");
        setFormData({ key: "", title: "", description: "", icon: "", image_url: "" });
        setImageFile(null);
        fetchFeatures();
      }
    }
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("features").delete().eq("id", id);
    if (error) {
      setMessage("Failed to delete feature.");
      console.error(error);
    } else {
      setMessage("Feature deleted successfully.");
      fetchFeatures();
    }
  };

  const handleEdit = (feature) => {
    setEditingId(feature.id);
    setFormData({
      key: feature.key,
      title: feature.title,
      description: feature.description,
      icon: feature.icon,
      image_url: feature.image_url,
    });
    setImageFile(null);
    setMessage("Edit mode: make changes and submit.");
  };

  return (
    <div className="relative w-full text-white min-h-screen overflow-hidden">
      <img
        src={herossectionImage}
        alt="hero section"
        className="absolute w-full h-full object-cover -z-[10]"
      />

      <div>
        <header className="max-w-[50rem] mx-auto px-8 py-10 z-10 relative">
          <h1 className="text-6xl font-semibold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Welcome to College Features Manage Page
          </h1>
          <Link 
            to="/admin" 
            className="inline-block bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            🏠 Home
          </Link>
        </header>
        <main className="p-6 max-w-6xl mx-auto space-y-8 z-[10]">
          <div className="bg-gradient-to-br from-slate-800 via-purple-900 to-slate-900 border-purple-500/20 shadow-2xl rounded-xl p-8">
            <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-red-500 to-yellow-500 bg-clip-text text-transparent">
              ⭐ Manage Features
            </h1>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input 
                name="key" 
                value={formData.key} 
                onChange={handleChange} 
                placeholder="🔑 Key (e.g., coding)" 
                required 
                className="text-white bg-slate-700/50 border-purple-400/30 focus:border-purple-400 focus:ring-purple-400/20 placeholder:text-gray-300"
              />
              <Input 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                placeholder="🎯 Feature Title" 
                required 
                className="text-white bg-slate-700/50 border-purple-400/30 focus:border-purple-400 focus:ring-purple-400/20 placeholder:text-gray-300"
              />
              <Textarea 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                placeholder="📝 Feature Description" 
                required 
                rows={4}
                className="text-white bg-slate-700/50 border-purple-400/30 focus:border-purple-400 focus:ring-purple-400/20 placeholder:text-gray-300 resize-none"
              />
              <Input 
                name="icon" 
                value={formData.icon} 
                onChange={handleChange} 
                placeholder="🎨 Icon name (e.g., FaCode)" 
                required 
                className="text-white bg-slate-700/50 border-purple-400/30 focus:border-purple-400 focus:ring-purple-400/20 placeholder:text-gray-300"
              />
              <Input 
                type="file" 
                onChange={handleImageChange} 
                accept="image/*" 
                className="text-white bg-slate-700/50 border-purple-400/30 focus:border-purple-400 focus:ring-purple-400/20 file:bg-purple-600 file:text-white file:border-0 file:rounded-md file:px-4 file:py-2 file:mr-4"
              />
              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white border-0 transform transition-all duration-300 hover:scale-105 hover:shadow-lg py-3"
              >
                {editingId ? "✏️ Update Feature" : "➕ Add Feature"}
              </Button>
              {message && (
                <div className={`p-4 rounded-lg border ${
                  message.includes('successfully') || message.includes('deleted') 
                    ? 'bg-green-500/10 border-green-500/30 text-green-300' 
                    : message.includes('failed') || message.includes('Failed')
                    ? 'bg-red-500/10 border-red-500/30 text-red-300'
                    : 'bg-blue-500/10 border-blue-500/30 text-blue-300'
                }`}>
                  <p className="text-sm font-medium text-center">
                    {message.includes('successfully') || message.includes('deleted') ? '✅' : 
                     message.includes('failed') || message.includes('Failed') ? '❌' : 'ℹ️'}
                    {' '}{message}
                  </p>
                </div>
              )}
            </form>
          </div>

          {/* Feature List */}
          <div>
            <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-emerald-400 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
              🎨 All Features
            </h2>
            {features.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-300 text-lg bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-8 inline-block">
                  ⭐ No features found. Add your first feature above!
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {features.map((feature) => (
                  <div
                    key={feature.id}
                    className="bg-gradient-to-br from-slate-800 via-indigo-900 to-slate-900 border-indigo-500/20 shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 p-6 rounded-xl hover:scale-[1.02] group"
                  >
                    <div className="space-y-4">
                      {feature.image_url && (
                        <div className="relative overflow-hidden rounded-lg">
                          <img
                            src={feature.image_url}
                            alt={feature.key}
                            className="w-full h-32 object-cover transition-all duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      )}
                      
                      <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        {feature.title}
                      </h3>
                      <p className="text-gray-200 leading-relaxed text-sm">
                        {feature.description}
                      </p>
                      
                      <div className="grid grid-cols-1 gap-2 text-sm">
                        <p className="text-cyan-300 flex items-center gap-2">
                          🎨 Icon: <span className="font-mono bg-slate-700/50 px-2 py-1 rounded">{feature.icon}</span>
                        </p>
                        <p className="text-emerald-300 flex items-center gap-2">
                          🔑 Key: <span className="font-mono bg-slate-700/50 px-2 py-1 rounded">{feature.key}</span>
                        </p>
                      </div>
                      
                      <div className="flex gap-3 pt-4 border-t border-gray-600/30">
                        <Button 
                          onClick={() => handleEdit(feature)}
                          className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        >
                          ✏️ Update
                        </Button>
                        <Button 
                          variant="destructive" 
                          onClick={() => handleDelete(feature.id)}
                          className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white border-0 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        >
                          🗑️ Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
