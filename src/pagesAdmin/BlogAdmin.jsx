import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent } from "../components/ui/card";
import { supabase } from "../supabaseClient";

// Importing image
import herossectionImage from "../images/herossection-image.avif";

export default function BlogAdmin() {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    status: "draft",
  });
  const [imageFile, setImageFile] = useState(null);
  const [editId, setEditId] = useState(null); // ← Track which blog is being edited
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching blogs:", error.message);
    } else {
      setBlogs(data);
    }
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (!imageFile) return null;

    const ext = imageFile.name.split(".").pop();
    const fileName = `${Date.now()}.${ext}`;

    const { data, error } = await supabase.storage
      .from("blog-images")
      .upload(fileName, imageFile);

    if (error) {
      console.error("Image upload failed:", error.message);
      return null;
    }

    const { data: publicData } = supabase.storage
      .from("blog-images")
      .getPublicUrl(fileName);

    return publicData?.publicUrl || null;
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleSubmit = async () => {
    setLoading(true);

    let imageUrl = null;
    if (imageFile) {
      imageUrl = await uploadImage();
    }

    const slug = generateSlug(formData.title);

    const blogData = {
      title: formData.title,
      content: formData.content,
      author: formData.author,
      status: formData.status,
      slug,
      ...(imageUrl && { cover_image: imageUrl }),
    };

    let error;

    if (editId) {
      // UPDATE
      const { error: updateError } = await supabase
        .from("blogs")
        .update(blogData)
        .eq("id", editId);

      error = updateError;
    } else {
      // INSERT
      blogData.cover_image = imageUrl || "";
      const { error: insertError } = await supabase
        .from("blogs")
        .insert([blogData]);

      error = insertError;
    }

    if (error) {
      console.error("Failed to save blog:", error.message);
    } else {
      setFormData({
        title: "",
        content: "",
        author: "",
        status: "draft",
      });
      setImageFile(null);
      setEditId(null); // ← Reset edit mode
      fetchBlogs();
    }

    setLoading(false);
  };

  const handleEdit = (blog) => {
    setEditId(blog.id);
    setFormData({
      title: blog.title,
      content: blog.content,
      author: blog.author,
      status: blog.status,
    });
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirm) return;

    const { error } = await supabase.from("blogs").delete().eq("id", id);

    if (error) {
      console.error("Failed to delete blog:", error.message);
    } else {
      fetchBlogs();
    }
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
            Welcome to College Blog Manage Page
          </h1>
          <Link 
            to="/admin" 
            className="inline-block bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            🏠 Home
          </Link>
        </header>

        <main className="p-6 max-w-4xl mx-auto space-y-6 z-[10]">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-400 via-red-500 to-yellow-500 bg-clip-text text-transparent">
            {editId ? "✏️ Edit Blog Post" : "📝 Add Blog Post"}
          </h2>

          <Card className="bg-gradient-to-br from-slate-800 via-purple-900 to-slate-900 border-purple-500/20 shadow-2xl">
            <CardContent className="space-y-4 p-6">
              <Input
                name="title"
                className="text-white bg-slate-700/50 border-purple-400/30 focus:border-purple-400 focus:ring-purple-400/20 placeholder:text-gray-300"
                placeholder="✨ Enter blog title"
                value={formData.title}
                onChange={handleInputChange}
              />
              <Textarea
                name="content"
                className="text-white bg-slate-700/50 border-purple-400/30 focus:border-purple-400 focus:ring-purple-400/20 placeholder:text-gray-300 min-h-[120px]"
                placeholder="📝 Enter blog content"
                value={formData.content}
                onChange={handleInputChange}
              />
              <Input
                name="author"
                className="text-white bg-slate-700/50 border-purple-400/30 focus:border-purple-400 focus:ring-purple-400/20 placeholder:text-gray-300"
                placeholder="👤 Enter author name"
                value={formData.author}
                onChange={handleInputChange}
              />
              <Input
                name="status"
                className="text-white bg-slate-700/50 border-purple-400/30 focus:border-purple-400 focus:ring-purple-400/20 placeholder:text-gray-300"
                placeholder="📊 Enter status (e.g., draft, published)"
                value={formData.status}
                onChange={handleInputChange}
              />
              <Input
                type="file"
                className="text-white bg-slate-700/50 border-purple-400/30 focus:border-purple-400 focus:ring-purple-400/20 file:bg-purple-600 file:text-white file:border-0 file:rounded-md file:px-4 file:py-2 file:mr-4"
                accept="image/*"
                onChange={handleImageChange}
              />
              <Button 
                onClick={handleSubmit} 
                disabled={loading}
                className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white border-0 transform transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? editId
                    ? "⏳ Updating..."
                    : "⏳ Submitting..."
                  : editId
                  ? "✏️ Update Blog"
                  : "📤 Submit Blog"}
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {blogs.map((blog) => (
              <Card key={blog.id} className="bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 border-blue-500/20 shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{blog.title}</h2>
                  <p className="text-sm text-cyan-300 flex items-center gap-2">
                    🕒 {new Date(blog.created_at).toLocaleString()}
                  </p>
                  <p className="text-sm text-emerald-300 flex items-center gap-2">
                    👤 By: {blog.author} | 📊 Status: <span className={`px-2 py-1 rounded-full text-xs font-semibold ${blog.status === 'published' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>{blog.status}</span>
                  </p>
                  {blog.slug && (
                    <p className="text-sm text-purple-300 italic flex items-center gap-2">
                      🔗 Slug: {blog.slug}
                    </p>
                  )}
                  {blog.cover_image && (
                    <img
                      src={blog.cover_image}
                      alt="Blog"
                      className="w-full max-h-60 object-cover rounded-lg border-2 border-blue-500/20"
                    />
                  )}
                  <p className="text-gray-200 leading-relaxed">{blog.content}</p>

                  <div className="flex gap-3 mt-6">
                    <Button 
                      variant="outline" 
                      onClick={() => handleEdit(blog)}
                      className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                      ✏️ Edit
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(blog.id)}
                      className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white border-0 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                      🗑️ Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
