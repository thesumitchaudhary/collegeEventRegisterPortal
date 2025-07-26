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
          <h1 className="text-6xl font-semibold mb-6">
            Welcome to College Blog Manage Page
          </h1>
          <Link to="/admin">Home</Link>
        </header>

        <main className="p-6 max-w-4xl mx-auto space-y-6 z-[10]">
          <h2 className="text-2xl font-bold">
            {editId ? "✏️ Edit Blog Post" : "📝 Add Blog Post"}
          </h2>

          <Card className="bg-[#111827]">
            <CardContent className="space-y-4 p-4">
              <Input
                name="title"
                className="text-white"
                placeholder="Enter blog title"
                value={formData.title}
                onChange={handleInputChange}
              />
              <Textarea
                name="content"
                className="text-white"
                placeholder="Enter blog content"
                value={formData.content}
                onChange={handleInputChange}
              />
              <Input
                name="author"
                className="text-white"
                placeholder="Enter author name"
                value={formData.author}
                onChange={handleInputChange}
              />
              <Input
                name="status"
                className="text-white"
                placeholder="Enter status (e.g., draft, published)"
                value={formData.status}
                onChange={handleInputChange}
              />
              <Input
                type="file"
                className="text-white"
                accept="image/*"
                onChange={handleImageChange}
              />
              <Button onClick={handleSubmit} disabled={loading}>
                {loading
                  ? editId
                    ? "Updating..."
                    : "Submitting..."
                  : editId
                  ? "Update Blog"
                  : "Submit Blog"}
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {blogs.map((blog) => (
              <Card key={blog.id}>
                <CardContent className="p-4 space-y-2">
                  <h2 className="text-xl font-semibold">{blog.title}</h2>
                  <p className="text-sm text-gray-400">
                    {new Date(blog.created_at).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    By: {blog.author} | Status: {blog.status}
                  </p>
                  {blog.slug && (
                    <p className="text-sm text-gray-400 italic">
                      Slug: {blog.slug}
                    </p>
                  )}
                  {blog.cover_image && (
                    <img
                      src={blog.cover_image}
                      alt="Blog"
                      className="w-full max-h-60 object-cover rounded"
                    />
                  )}
                  <p>{blog.content}</p>

                  <div className="flex gap-3 mt-3">
                    <Button variant="outline" onClick={() => handleEdit(blog)}>
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(blog.id)}
                    >
                      Delete
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
