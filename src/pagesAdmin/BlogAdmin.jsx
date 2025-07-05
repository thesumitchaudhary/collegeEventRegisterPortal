import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent } from '../components/ui/card';

export default function BlogAdmin() {
    const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchBlogs = async () => {
    const { data, error } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
    if (error) console.error(error);
    else setBlogs(data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (editingId) {
      await supabase.from('blogs').update(formData).eq('id', editingId);
    } else {
      await supabase.from('blogs').insert(formData);
    }
    setFormData({ title: '', content: '' });
    setEditingId(null);
    fetchBlogs();
  };

  const handleEdit = (blog) => {
    setFormData({ title: blog.title, content: blog.content });
    setEditingId(blog.id);
  };

  const handleDelete = async (id) => {
    await supabase.from('blogs').delete().eq('id', id);
    fetchBlogs();
  };
  return (
    <div>
      <header className="flex justify-between">
        <h1>CER</h1>
        <nav className="text-black flex gap-10">
          <Link to="/admin">Home</Link>
          <Link>Event</Link>
          <Link>blog</Link>
          <Link>resource</Link>
        </nav>
      </header>
      <main>
        <div className="p-6 max-w-4xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold">📝 Blog Manager (Admin)</h1>

          <Card>
            <CardContent className="space-y-4 p-4">
              <Input
                name="title"
                placeholder="Blog Title"
                value={formData.title}
                onChange={handleInputChange}
              />
              <Textarea
                name="content"
                placeholder="Blog Content"
                value={formData.content}
                onChange={handleInputChange}
              />
              <Button onClick={handleSubmit}>
                {editingId ? "Update Blog" : "Create Blog"}
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {blogs.map((blog) => (
              <Card key={blog.id}>
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold">{blog.title}</h2>
                  <p className="text-sm text-gray-600">
                    {new Date(blog.created_at).toLocaleString()}
                  </p>
                  <p className="mt-2">{blog.content}</p>
                  <div className="flex gap-2 mt-4">
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
        </div>
        );
      </main>
      <footer></footer>
    </div>
  );
}
