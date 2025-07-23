// components/BlogCarousel.jsx
import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";



export default function BlogCarousel() {
  const [blogs, setBlogs] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase.from("blog").select("*");

      if (error) {
        console.log(error);
        // console.error("Error fetching blogs:", error);
      } else {
        setBlogs(data);
      }
    };

    fetchBlogs();
  }, []);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % blogs.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + blogs.length) % blogs.length);
  };

  if (blogs.length === 0) return <p className="text-center">Loading...</p>;

  return (
    <div className="relative w-full max-w-3xl mx-auto mt-10">
      <Card className="overflow-hidden rounded-2xl shadow-lg">
        <CardContent className="p-0">
          <img
            src={blogs[index].cover_image}
            alt={blogs[index].title}
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold">{blogs[index].title}</h2>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {blogs[index].content}
            </p>
          </div>
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
