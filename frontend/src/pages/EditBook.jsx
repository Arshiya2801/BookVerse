
import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import Layout from '../components/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import ProtectedRoute from '../utils/ProtectedRoute';

export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', author: '', description: '', genre: '', year: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await API.get(`/books/${id}`);
        setForm({ title: data.title || '', author: data.author || '', description: data.description || '', genre: data.genre || '', year: data.year || '' });
      } catch (err) {
        alert('Cannot load book');
      }
    })();
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.put(`/books/${id}`, { ...form, year: form.year ? Number(form.year) : undefined });
      navigate(`/books/${id}`);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update');
    } finally { setLoading(false); }
  };

  return (
    <ProtectedRoute>
      <Layout>
        <div className="max-w-2xl bg-white dark:bg-gray-800 p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-4">Edit Book</h2>
          <form onSubmit={submit} className="space-y-3">
            <input required value={form.title} onChange={e=>setForm({...form, title: e.target.value})} placeholder="Title" className="w-full p-2 border rounded" />
            <input required value={form.author} onChange={e=>setForm({...form, author: e.target.value})} placeholder="Author" className="w-full p-2 border rounded" />
            <input value={form.genre} onChange={e=>setForm({...form, genre: e.target.value})} placeholder="Genre" className="w-full p-2 border rounded" />
            <input value={form.year} onChange={e=>setForm({...form, year: e.target.value})} placeholder="Published Year" type="number" className="w-full p-2 border rounded" />
            <textarea value={form.description} onChange={e=>setForm({...form, description: e.target.value})} placeholder="Description" className="w-full p-2 border rounded" rows={4} />
            <button disabled={loading} className="px-4 py-2 bg-purple-600 text-white rounded">{loading ? 'Saving...' : 'Save Changes'}</button>
          </form>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
