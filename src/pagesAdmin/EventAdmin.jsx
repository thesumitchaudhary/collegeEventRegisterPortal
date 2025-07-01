import React from "react";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent } from '../components/ui/card';

export default function EventAdmin() {
  return (
    <div>
      <header className="flex justify-between">
        <h1>CER</h1>
        <nav className="text-black flex gap-10">
          <Link to="/admin">Home</Link>
          <Link>Event control</Link>
          <Link>blog control</Link>
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
