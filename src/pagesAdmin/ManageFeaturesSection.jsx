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
    key: "coding",
    title: "Join Coding Competitions & Hackathons",
    description: "Participate in technical fests, hackathons, and code challenges organized by various departments and clubs.",
    icon: "FaCode",
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
          <h1 className="text-6xl font-semibold mb-6">
            Welcome to College Features Manage Page
          </h1>
          <Link to="/admin" className="underline text-blue-400">Home</Link>
        </header>
        <main>
          <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Manage Features</h1>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-4 mb-6 bg-[#111827] p-6 rounded-lg shadow-lg"
            >
              <Input name="key" value={formData.key} onChange={handleChange} placeholder="Key (e.g., coding)" required />
              <Input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
              <Textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
              <Input name="icon" value={formData.icon} onChange={handleChange} placeholder="Icon name (e.g., FaCode)" required />
              <Input type="file" onChange={handleImageChange} accept="image/*" />
              <Button type="submit">{editingId ? "Update" : "Insert"} Feature</Button>
                  {message && (
              <div className="text-sm p-3 mb-6 bg-transparent text-green rounded shadow">
                {message}
              </div>
            )} 
            </form>

        

            {/* Feature List */}
            <div className="space-y-6">
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className="bg-[#1f2937] p-4 rounded-lg shadow flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                    <p className="text-gray-300 text-sm">{feature.description}</p>
                    <p className="text-gray-400 text-sm">
                      Icon: {feature.icon} | Key: {feature.key}
                    </p>
                    <img
                      src={feature.image_url}
                      alt={feature.key}
                      className="w-32 h-20 object-cover mt-2 rounded border"
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={() => handleEdit(feature)}>Update</Button>
                    <Button variant="destructive" onClick={() => handleDelete(feature.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
