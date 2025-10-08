import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BlogCarousel() {
  const [blogs, setBlogs] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [directionForward, setDirectionForward] = useState(true);

  // ✅ Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase.from("blogs").select("*");

      console.log("✅ Fetched Data:", data);
      console.log("❌ Fetch Error:", error);

      if (error) {
        alert("Supabase Error: " + error.message);
      } else if (!data || data.length === 0) {
        alert("No blogs returned from Supabase.");
      } else {
        setBlogs(data);
      }

      setLoading(false);
    };

    fetchBlogs();
  }, []);

  // ✅ Auto ping-pong slide
  useEffect(() => {
    if (blogs.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        if (directionForward) {
          if (prevIndex === blogs.length - 1) {
            setDirectionForward(false);
            return prevIndex - 1;
          } else {
            return prevIndex + 1;
          }
        } else {
          if (prevIndex === 0) {
            setDirectionForward(true);
            return prevIndex + 1;
          } else {
            return prevIndex - 1;
          }
        }
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [blogs, directionForward]);

  // ✅ Reset index if blogs length changes
  useEffect(() => {
    if (index >= blogs.length && blogs.length > 0) {
      setIndex(0);
    }
  }, [blogs, index]);

  const nextSlide = () => {
    setDirectionForward(true);
    setIndex((prev) => (prev + 1) % blogs.length);
  };

  const prevSlide = () => {
    setDirectionForward(false);
    setIndex((prev) => (prev - 1 + blogs.length) % blogs.length);
  };

  if (loading) {
    return (
      <div className="text-center text-white animate-pulse p-4">
        Loading blog posts...
      </div>
    );
  }

  if (blogs.length === 0) {
    return <p className="text-center text-red-500">No blogs found.</p>;
  }

  // ✅ Safe blog reference
  const currentBlog = blogs[index] || {};

  return (
    <div className="relative w-full max-w-3xl mx-auto mt-10">
      <Card className="overflow-hidden rounded-2xl shadow-lg bg-[#000]">
        <CardContent className="p-0">
          <img
            src={
              currentBlog.cover_image ||
              "https://via.placeholder.com/600x400?text=No+Image"
            }
            alt={currentBlog.title || "Untitled"}
            className="w-full h-64 object-cover transition-all duration-1000"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/600x400?text=Image+Not+Found";
            }}
          />
        </CardContent>
      </Card>

      {/* Controls */}
      <div className="absolute inset-y-0 left-0 flex items-center">
        <Button variant="ghost" size="icon" onClick={prevSlide}>
          <ChevronLeft />
        </Button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <Button variant="ghost" size="icon" onClick={nextSlide}>
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
