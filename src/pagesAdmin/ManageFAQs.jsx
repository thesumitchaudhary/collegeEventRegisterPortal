import React from 'react'
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function ManageFAQs() {
  const [faqs, setFaqs] = useState([]);
  const [formData, setFormData] = useState({ question: '', answer: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    const { data, error } = await supabase.from('faqs').select('*').order('created_at', { ascending: false });
    if (!error) setFaqs(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await supabase.from('faqs').update(formData).eq('id', editingId);
    } else {
      await supabase.from('faqs').insert([formData]);
    }
    setFormData({ question: '', answer: '' });
    setEditingId(null);
    fetchFAQs();
  };

  const handleEdit = (faq) => {
    setFormData({ question: faq.question, answer: faq.answer });
    setEditingId(faq.id);
  };

  const handleDelete = async (id) => {
    await supabase.from('faqs').delete().eq('id', id);
    fetchFAQs();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Admin: Manage FAQs</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <Input
          placeholder="Question"
          value={formData.question}
          onChange={(e) => setFormData({ ...formData, question: e.target.value })}
          required
        />
        <Textarea
          placeholder="Answer"
          value={formData.answer}
          onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
          required
        />
        <Button type="submit">{editingId ? 'Update FAQ' : 'Add FAQ'}</Button>
      </form>

      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.id} className="border p-4 rounded shadow-sm">
            <h3 className="font-semibold">{faq.question}</h3>
            <p className="text-gray-600">{faq.answer}</p>
            <div className="flex gap-2 mt-2">
              <Button onClick={() => handleEdit(faq)}>Edit</Button>
              <Button variant="destructive" onClick={() => handleDelete(faq.id)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
