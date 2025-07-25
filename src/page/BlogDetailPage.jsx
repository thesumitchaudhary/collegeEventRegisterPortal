import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Button } from "../components/ui/button";

function BlogDetailPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch blog post by slug
  useEffect(() => {
    const fetchBlog = async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) {
        console.error("Error fetching blog:", error.message);
      } else {
        setBlog(data);
      }

      setLoading(false);
    };

    fetchBlog();
  }, [slug]);

  if (loading) return <p className="p-4 text-white">Loading...</p>;

  if (!blog)
    return (
      <div className="p-4 text-red-500 text-center">Blog not found 😕</div>
    );

  return (
    <div className="p-4 bg-black text-white min-h-screen">
      <div className="max-w-3xl mx-auto">
        <img
          src={blog.cover_image}
          alt={blog.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
        <p className="text-sm text-muted-foreground mb-4">
          Published on: {new Date(blog.created_at).toLocaleDateString()}
        </p>
        <p className="text-base leading-relaxed whitespace-pre-line">
          {blog.content}
        </p>
        <div className="mt-6">
          <Button className="bg-white text-black" onClick={() => history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BlogDetailPage;
